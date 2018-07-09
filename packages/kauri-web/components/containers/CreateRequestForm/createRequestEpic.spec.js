import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import contract from 'truffle-contract'
import Web3 from 'web3'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import HDWalletProvider from '../../../forked_modules/truffle-hdwallet-provider'
import config from '../../../config'
import initApollo from '../../../lib/init-apollo'
import { createRequestAction, createRequestEpic } from './Module'
import { searchRequests } from '../../../queries/Request'

const testEpic = (epic, action, state = {}, dependencies = {}) => {
  const actions = new Subject()
  const actions$ = new ActionsObservable(actions)
  const store = { getState: () => state }

  const promised = epic(actions$, store, dependencies)
    .toArray()
    .toPromise()

  if (action.length) {
    action.map(act => actions.next(act))
    actions.complete()
  } else {
    actions.next(action)
    actions.complete()
  }

  return promised
}

const KauriCoreArtifact = require(config.default.KauriCoreArtifact)
const message = 'v0G9u7huK4mJb2K1'

const login = async (userId, signature) =>
  fetch(`http://${config.default.monolithApi}/auth`, {
    method: 'post',
    body: JSON.stringify({
      owner: userId,
      signature,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(({ token }) => token)

const web3GetAccounts = web3 =>
  new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, result) => {
      err ? reject(err) : resolve(result)
    })
  })

const web3Sign = (web3, web3Account, web3Message) =>
  new Promise((resolve, reject) => {
    web3.eth.sign(web3Account, web3Message, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })

describe.skip('createRequest epic', () => {
  let KauriCore
  it('should call graphql and the smart contract', async () => {
    const spy = jest.fn()
    const sourceAction = createRequestAction(
      {
        bounty: 1337,
        subject: 'subject test',
        text: 'hello world',
        category: 'category',
        dead_line: moment().add(3, 'days'),
      },
      spy
    )
    const expectedActions = [
      {
        type: 'SHOW_NOTIFICATION',
        notificationType: 'success',
        message: 'Request created',
        description: expect.any(String),
      },
    ]
    KauriCore = contract(KauriCoreArtifact)
    const mnemonic = config.default.devSeedWords
    const provider = new HDWalletProvider(mnemonic, `http://${config.default.gethBlockchain}`)
    const web3 = new Web3(provider)
    let web3Account = await web3GetAccounts(web3)
    web3Account = web3Account[0]
    web3.eth.accounts[0] = web3Account[0]
    KauriCore.setProvider(web3.currentProvider)
    KauriCore = await KauriCore.deployed()
    window.web3 = web3
    const signature = await web3Sign(web3, web3Account, web3.toHex(message))
    const token = await login(web3Account, signature)
    const apolloClient = initApollo(
      {},
      {
        getToken: () => token,
      }
    )
    const resultingActions = await testEpic(
      createRequestEpic,
      sourceAction,
      { app: { userId: web3Account } },
      {
        web3,
        apolloClient,
        smartContracts: () => ({ KauriCore }),
      }
    )

    expect(resultingActions).toEqual(expectedActions)
    expect(spy).toHaveBeenCalled()
  })
})

describe('createRequest unit test', async () => {
  let smartContractPayload
  let KauriCore
  let web3
  let web3Account
  let result

  beforeAll(async () => {
    global.process.env.monolithExternalApi = config.default.monolithExternalApi
    global.process.env.monolithApi = config.default.monolithApi

    smartContractPayload = {
      id: '',
      contentHash: '',
      category: '',
      deadLine: '',
      weiBounty: '',
      options: {
        from: '',
        value: 0,
        gas: 250000,
        gasPrice: '',
      },
    }

    KauriCore = contract(KauriCoreArtifact)
    const mnemonic = config.default.devSeedWords
    const provider = new HDWalletProvider(mnemonic, `http://${config.default.gethBlockchain}`)
    web3 = new Web3(provider)
    web3Account = await web3GetAccounts(web3)
    web3Account = web3Account[0]
    KauriCore.setProvider(web3.currentProvider)
    KauriCore = await KauriCore.deployed()
  })

  it('should take in correct parameters', async () => {
    const signature = await web3Sign(web3, web3Account, web3.toHex(message))
    const token = await login(web3Account, signature)
    const apolloClient = initApollo(
      {},
      {
        getToken: () => token,
      }
    )

    const {
      data: {
        searchRequests: { content },
      },
    } = await apolloClient.query({
      query: searchRequests,
      variables: {
        filter: { status_in: ['OPENED'] },
        status_in: ['OPENED'],
        size: 1,
        sort: 'date_created',
        userId: null,
      },
    })
    const openedRequest = content[0]
    expect(openedRequest).not.toBeUndefined()
    expect(openedRequest).toMatchObject({
      request_id: expect.any(String),
    })

    smartContractPayload.id = openedRequest.request_id
    smartContractPayload.contentHash = web3.sha3(openedRequest.content_hash).toString('hex')
    smartContractPayload.category = openedRequest.category
    smartContractPayload.dead_line = Math.floor(openedRequest.dead_line / 1000)
    smartContractPayload.weiBounty = web3.toWei(openedRequest.bounty, 'ether')
    smartContractPayload.options.from = web3Account
    smartContractPayload.options.gasPrice = web3.toWei(1, 'wei')

    try {
      result = await KauriCore.addRequest.sendTransaction(
        smartContractPayload.id,
        smartContractPayload.contentHash,
        smartContractPayload.category,
        smartContractPayload.dead_line,
        smartContractPayload.weiBounty,
        {
          from: smartContractPayload.options.from,
          value: smartContractPayload.options.value,
          gas: 250000,
          gasPrice: smartContractPayload.options.gasPrice,
        }
      )
    } catch (err) {
      console.error(err)
      result = err
    } finally {
      if (typeof result === 'object') {
        expect(result.message).not.toEqual(expect.stringContaining('Solidity'))
      } else {
        expect(typeof result).toBe('string')
      }
    }
  })
})
