import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import contract from 'truffle-contract'
import config from '../../../config'
import Web3 from 'web3'
import HDWalletProvider from '../../../forked_modules/truffle-hdwallet-provider'
import initApollo from '../../../lib/init-apollo'
import { createRequest, searchRequests } from '../../../queries/Request'
import { flagRequestAction, flagRequestEpic } from './Module'
import { web3GetAccounts, web3Sign, login, message } from '../../../__tests__/lib/test-helpers'

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

describe.skip('flagRequest epic', () => {
  let KauriCore
  it(
    'should call graphql and the smart contract',
    async () => {
      KauriCore = contract(KauriCoreArtifact)
      const web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.gethBlockchain}`))
      KauriCore.setProvider(web3.currentProvider)
      KauriCore = await KauriCore.deployed()
      const apolloClient = initApollo(
        {},
        {
          getToken: () =>
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIweDMxYjI2ZTQzNjUxZTkzNzFjODhhZjNkMzZjMTRjZmQ5MzhiYWY0ZmQiLCJleHAiOjE4MjQ4MDk5NjUsImlzcyI6ImZsb3ciLCJpYXQiOjE1MDk0NDk5NjV9.E_nIPG9r0RxwT4yCJywXRy1okGjMCYFwBECqpFvcuI0kyQw2xC6PA1ohPDbPU8SQ4Agkbg6I3Fs9TkBb14PR7w',
        }
      )
      const {
        data: {
          createRequest: { request_id },
        },
      } = await apolloClient.mutate({
        mutation: createRequest({ bounty: 0.1, subject: 'Hello world!', text: 'lol', category: 'metamask' }),
      })
      const sourceAction = flagRequestAction({ request_id })
      const expectedActions = [
        {
          type: 'SHOW_NOTIFICATION',
          notificationType: 'info',
          message: 'Request flagging in progress',
          description: expect.any(String),
        },
      ]
      const resultingActions = await testEpic(flagRequestEpic, sourceAction, null, {
        web3,
        apolloClient,
        smartContracts: () => ({ KauriCore }),
      })

      expect(resultingActions).toEqual(expectedActions)
    },
    500000
  )
})

describe('flagRequest and unFlagRequest unit test', async () => {
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
    smartContractPayload.options.from = web3Account
    smartContractPayload.options.gasPrice = web3.toWei(1, 'wei')

    try {
      result = await KauriCore.startWorkOnRequest.sendTransaction(smartContractPayload.id, {
        from: smartContractPayload.options.from,
        gas: 250000,
        gasPrice: smartContractPayload.options.gasPrice,
      })
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

    try {
      result = await KauriCore.cancelWorkOnRequest.sendTransaction(smartContractPayload.id, {
        from: smartContractPayload.options.from,
        gas: 250000,
        gasPrice: smartContractPayload.options.gasPrice,
      })
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
