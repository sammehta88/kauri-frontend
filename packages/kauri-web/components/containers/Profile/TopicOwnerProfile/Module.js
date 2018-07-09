// @flow
import { Observable } from 'rxjs'
import { showNotificationAction } from '../../../../lib/Module'
import { trackMixpanelAction } from '../../Link/Module'

import type { Dependencies } from '../../../../lib/Module'

export type SetWalletAvailableFundsPayload = { funds: number }

export type FetchWalletAvailableFundsPayload = { userId: string }

export type FetchWalletAvailableFundsAction = {
  type: 'FETCH_WALLET_AVAILABLE_FUNDS',
  payload: FetchWalletAvailableFundsPayload,
}

export type SetWalletAvailableFundsAction = {
  type: 'SET_WALLET_AVAILABLE_FUNDS',
  payload: SetWalletAvailableFundsPayload,
}

export type WithdrawWalletAvailableFundsAction = { type: 'WITHDRAW_WALLET_AVAILABLE_FUNDS' }

type Action = FetchWalletAvailableFundsAction | SetWalletAvailableFundsAction | WithdrawWalletAvailableFundsAction

const FETCH_WALLET_AVAILABLE_FUNDS = 'FETCH_WALLET_AVAILABLE_FUNDS'

export const SET_WALLET_AVAILABLE_FUNDS = 'SET_WALLET_AVAILABLE_FUNDS'

const WITHDRAW_WALLET_AVAILABLE_FUNDS = 'WITHDRAW_WALLET_AVAILABLE_FUNDS'

export const fetchWalletAvailableFundsAction = (
  payload: FetchWalletAvailableFundsPayload
): FetchWalletAvailableFundsAction => ({
  type: FETCH_WALLET_AVAILABLE_FUNDS,
  payload,
})

export const withdrawWalletAvailableFundsAction = (): WithdrawWalletAvailableFundsAction => ({
  type: WITHDRAW_WALLET_AVAILABLE_FUNDS,
})

export const setWalletAvailableFundsAction = (
  payload: SetWalletAvailableFundsPayload
): SetWalletAvailableFundsAction => ({
  type: SET_WALLET_AVAILABLE_FUNDS,
  payload,
})

export const fetchWalletAvailableFundsEpic = (
  action$: Observable<FetchWalletAvailableFundsAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(FETCH_WALLET_AVAILABLE_FUNDS)
    .do(h => console.log(h))
    .switchMap(({ payload: { userId } }: FetchWalletAvailableFundsAction) =>
      Observable.fromPromise(
        smartContracts().Wallet.getAvailableFunds.call(userId, {
          from: web3.eth.accounts[0],
        })
      )
        .do(h => console.log(h))
        .map(funds => setWalletAvailableFundsAction({ funds: funds.toNumber() }))
    )

export const withdrawWalletAvailableFundsEpic = (
  action$: Observable<WithdrawWalletAvailableFundsAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$.ofType(WITHDRAW_WALLET_AVAILABLE_FUNDS).switchMap(() =>
    Observable.fromPromise(getGasPrice())
      .flatMap(gasPrice =>
        smartContracts().Wallet.withdrawFunds.sendTransaction({
          from: web3.eth.accounts[0],
          gas: 250000,
          gasPrice,
        })
      )
      .do((transactionHash: string) => {
        dispatch(
          showNotificationAction({
            notificationType: 'info',
            message: 'Waiting for it to be mined',
            description: 'You will get another notification when the block is mined!',
          })
        )
        dispatch(
          trackMixpanelAction({
            event: 'Onchain',
            metaData: {
              resource: 'kauri',
              resourceID: 'n/a',
              resourceAction: 'withdraw funds transaction submitted',
              transactionHash,
            },
          })
        )
      })
      .flatMap((transactionHash: string) => Observable.fromPromise(apolloSubscriber(transactionHash, 'FundsWithdrawn')))
      .mergeMap(() =>
        Observable.of(
          showNotificationAction({
            notificationType: 'success',
            message: 'Request has been mined!',
            description: '1 block has been confirmed!',
          }),
          fetchWalletAvailableFundsAction({ userId: web3.eth.accounts[0] })
        )
      )
      .catch(err => {
        console.error(err)
        return Observable.of(
          showNotificationAction({
            notificationType: 'error',
            message: 'Submission error',
            description: 'Please try again!',
          })
        )
      })
  )
