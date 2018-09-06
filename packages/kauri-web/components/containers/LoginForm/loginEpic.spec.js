import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import Web3 from 'web3'
import config from '../../../config'
import fetch from 'isomorphic-unfetch'
import HDWalletProvider from '../../../forked_modules/truffle-hdwallet-provider'
import { registerEpic, registerAction } from './Module'

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

describe.skip('login epic', () => {
  it(
    'should request a sentence to sign, request an auth token, trigger a notification and redirect to the homepage',
    async () => {
      const mnemonic = config.default.devSeedWords
      const provider = new HDWalletProvider(mnemonic, `http://${config.default.gethBlockchain}`)
      let web3 = new Web3(provider)
      let web3Account = await web3GetAccounts(web3)
      web3Account = web3Account[0]
      web3.eth.accounts[0] = web3Account[0]
      global.window.web3 = web3
      const payload = {}
      const sourceAction = registerAction(
        payload,
        () => {}
      )
      const expectedActions = [
        {
          type: 'SHOW_NOTIFICATION',
          notificationType: 'success',
          message: 'Registration successful',
          description: 'Get those bounties!',
        },
        {
          type: 'TRACK_MIXPANEL',
          payload: {
            event: 'Offchain',
            metaData: {
              resource: 'kauri',
              resourceID: 'n/a',
              resourceVersion: 'n/a',
              resourceAction: 'login',
            },
          },
        },
      ]

      const resultingActions = await testEpic(registerEpic, sourceAction, { getState: () => ({ app: { hostName: 'api.dev2.kauri.io' } }) }, {
        web3,
        fetch,
      })

      expect(resultingActions).toEqual(expectedActions)
    },
    500000
  )
})
