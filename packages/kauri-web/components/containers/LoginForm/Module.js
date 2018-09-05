// @flow

import { Observable } from 'rxjs/Observable'
import cookie from 'cookie'
import createReducer from '../../../lib/createReducer'
import { showNotificationAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'
import { loginPersonalSign } from '../../../lib/web3-personal-sign'
import superagent from 'superagent'

import type { Dependencies } from '../../../lib/Module'
const config = require('../../../config').default

const request = superagent.agent()

type State = {}

export type RegisterActionPayload = {
  username: string,
  email: string,
  userId?: ?string,
  type?: 'login' | 'register',
}
type RegisterAction = { type: string, payload: RegisterActionPayload, callback: any }

type Action = RegisterAction

const initialState: State = {}

const REGISTER: string = 'REGISTER'

const message = 'v0G9u7huK4mJb2K1'

export const registerAction = (payload: RegisterActionPayload, callback: any): RegisterAction => ({
  type: REGISTER,
  payload,
  callback,
})

export const registerEpic = (action$: Observable<RegisterAction>, store: any, { fetch }: Dependencies) =>
  action$.ofType(REGISTER).switchMap(({ payload: { username, email, userId, type }, callback }: RegisterAction) =>
    loginPersonalSign(message)
      .flatMap(signature =>
        request
          .post(`https://${config.getApiURL((store.getState().app && store.getState().app.hostName) || process.env.monolithExternalApi)}/auth`)
          .send({
            owner: userId,
            signature,
            email,
            username,
          })
          .withCredentials()
      )
      .map(res => res.body)
      .do(() => callback())
      .do(({ token }) => {
        console.log(token)
        console.log(window.web3.eth.accounts[0])
        if (process.env.e2eTesting || process.env.NODE_ENV !== 'production') {
          document.cookie = cookie.serialize('TOKEN', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
          })
          document.cookie = cookie.serialize('USER_ID', window.web3.eth.accounts[0], {
            maxAge: 30 * 24 * 60 * 60, // 30 days
          })
        }
      })
      .flatMapTo(
        Observable.of(
          trackMixpanelAction({
            event: 'Offchain',
            metaData: {
              resource: 'kauri',
              resourceID: 'n/a',
              resourceAction: 'login',
            },
          }),
          showNotificationAction({
            notificationType: 'success',
            message: type === 'login' ? 'Login successful' : 'Registration successful',
            description: 'Get those bounties!',
          })
        )
      )
      .delay(500)
      .do(() => (window.location = '/profile'))
      .catch(err => {
        console.error(err)
        if (err && err.message.includes('Metamask locked!')) {
          return Observable.of(
            showNotificationAction({
              notificationType: 'error',
              message: 'Your wallet is locked!',
              description: 'Please unlock your wallet!',
            })
          )
        }
        return Observable.of(
          showNotificationAction({
            notificationType: 'error',
            message: 'Submission error',
            description: 'Please try again!',
          })
        )
      })
  )

const handlers = {
  [REGISTER]: (state: State, action: Action) => ({
    ...state,
    hello: action.payload,
  }),
}

export default createReducer(initialState, handlers)
