// @flow

import { Observable } from 'rxjs/Observable'
import { showNotificationAction, routeChangeAction } from '../../../lib/Module'
import { trackMixpanelAction } from '../Link/Module'
import { addRequestComment, storeRequestOwnershipSignature } from '../../../queries/Request'
import moment from 'moment'

import type { Dependencies } from '../../../lib/Module'

export type AddToBountyPayload = { request_id: string, bounty: number }

export type UpdateRequestPayload = { request_id: string, subject: string, text: string }

export type FlagRequestPayload = { request_id: string, isFlagged?: boolean }

export type RequestRefundPayload = { request_id: string }

export type AddRequestCommentPayload = { request_id: string, comment: string }

export type ResubmitRequestPayload = {
  request_id: string,
  bounty: number,
  content_hash: string,
  category: string,
  dead_line: any,
}

type RequestFilteredInfoAction = { type: 'REQUEST_FILTERED_INFO_ACTION', payload?: string }

export type UpdateRequestAction = { type: 'UPDATE_REQUEST', payload: UpdateRequestPayload }

export type FlagRequestAction = { type: 'FLAG_REQUEST', payload: FlagRequestPayload }

export type RequestRefundAction = { type: 'REQUEST_REFUND', payload: RequestRefundPayload }

export type ResubmitRequestAction = { type: 'RESUBMIT_REQUEST', payload: ResubmitRequestPayload }

export type AddRequestCommentAction = {
  type: 'ADD_REQUEST_COMMENT',
  payload: AddRequestCommentPayload,
  callback: () => void,
}

export type AddToBountyAction = {
  type: 'ADD_TO_BOUNTY',
  payload: AddToBountyPayload,
  callback: any,
}

type Action =
  | RequestFilteredInfoAction
  | UpdateRequestAction
  | FlagRequestAction
  | AddRequestCommentAction
  | AddToBountyAction
  | RequestRefundAction
  | ResubmitRequestAction

const FLAG_REQUEST = 'FLAG_REQUEST'

const ADD_REQUEST_COMMENT = 'ADD_REQUEST_COMMENT'

const ADD_TO_BOUNTY = 'ADD_TO_BOUNTY'

const REQUEST_REFUND = 'REQUEST_REFUND'

const RESUBMIT_REQUEST = 'RESUBMIT_REQUEST'

export const flagRequestAction = (payload: FlagRequestPayload): FlagRequestAction => ({
  type: FLAG_REQUEST,
  payload,
})

export const addRequestCommentAction = (
  payload: AddRequestCommentPayload,
  callback: () => void
): AddRequestCommentAction => ({
  type: ADD_REQUEST_COMMENT,
  payload,
  callback,
})

export const addToBountyAction = (payload: AddToBountyPayload, callback: any): AddToBountyAction => ({
  type: ADD_TO_BOUNTY,
  payload,
  callback,
})

export const requestRefundAction = (payload: RequestRefundPayload): RequestRefundAction => ({
  type: REQUEST_REFUND,
  payload,
})

export const resubmitRequestAction = (payload: ResubmitRequestPayload): ResubmitRequestAction => ({
  type: RESUBMIT_REQUEST,
  payload,
})

export const flagRequestEpic = (
  action$: Observable<FlagRequestAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$.ofType(FLAG_REQUEST).switchMap(({ payload: { request_id, isFlagged } }) =>
    Observable.fromPromise(getGasPrice())
      .flatMap(
        gasPrice =>
          typeof isFlagged === 'boolean' && isFlagged === true
            ? smartContracts().KauriCore.cancelWorkOnRequest.sendTransaction(request_id, {
              from: web3.eth.accounts[0],
              gas: 250000,
              gasPrice,
            })
            : smartContracts().KauriCore.startWorkOnRequest.sendTransaction(request_id, {
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
              resource: 'request',
              resourceID: request_id,
              resourceAction: `${isFlagged ? 'unflag' : 'flag'} request transaction submitted`,
              transactionHash,
            },
          })
        )
      })
      .flatMap((transactionHash: string) => apolloSubscriber(transactionHash, 'RequestFlagged'))
      .do(h => console.log(h))
      .mapTo(
        showNotificationAction({
          notificationType: 'success',
          message: `Request ${isFlagged ? 'flagging' : 'unflagging'} has been mined!`,
          description: '1 block has been confirmed',
        })
      )
      .do(() => apolloClient.resetStore())
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

export const addRequestCommentEpic = (
  action$: Observable<AddRequestCommentAction>,
  _: any,
  { apolloClient, smartContracts, web3, apolloSubscriber }: Dependencies
) =>
  action$
    .ofType(ADD_REQUEST_COMMENT)
    .switchMap(({ payload: { request_id, comment }, callback }: AddRequestCommentAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: addRequestComment,
          variables: {
            request_id,
            comment,
          },
        })
      )
        .flatMap(({ data: { commentRequest: { hash } } }: { data: { commentRequest: { hash: string } } }) =>
          apolloSubscriber(hash)
        )
        .do(() => callback())
        .do(() => apolloClient.resetStore())
        .flatMapTo(
          Observable.of(
            trackMixpanelAction({
              event: 'Offchain',
              metaData: {
                resource: 'request',
                resourceID: request_id,
                resourceAction: 'add comment for request',
              },
            }),
            showNotificationAction({
              notificationType: 'success',
              message: 'Comment added!',
              description: '',
            })
          )
        )
    )

export const addToBountyEpic = (
  action$: Observable<AddToBountyAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$.ofType(ADD_TO_BOUNTY).switchMap(({ payload: { request_id, bounty }, callback }: AddToBountyAction) => {
    const weiBounty = web3.toWei(bounty, 'ether')

    return Observable.fromPromise(getGasPrice())
      .flatMap(gasPrice =>
        smartContracts().KauriCore.addToBounty.sendTransaction(request_id, weiBounty, {
          from: web3.eth.accounts[0],
          value: weiBounty,
          gas: 250000,
          gasPrice,
        })
      )
      .do(() => callback())
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
              resource: 'request',
              resourceID: request_id,
              resourceAction: `add to request bounty transaction submitted`,
              additionalBounty: bounty,
              transactionHash,
            },
          })
        )
      })
      .flatMap((transactionHash: string) => apolloSubscriber(transactionHash, 'BountyAdded'))
      .mapTo(
        showNotificationAction({
          notificationType: 'success',
          message: 'Bounty contribution has been mined!',
          description: `Amount of ${bounty} ETH`,
        })
      )
      .do(() => apolloClient.resetStore())
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
  })

export const requestRefundEpic = (
  action$: Observable<RequestRefundAction>,
  { dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, getGasPrice }: Dependencies
) =>
  action$.ofType(REQUEST_REFUND).switchMap(({ payload: { request_id } }: RequestRefundAction) =>
    Observable.fromPromise(getGasPrice())
      .flatMap(gasPrice =>
        smartContracts().KauriCore.refundRequest.sendTransaction(request_id, {
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
              resource: 'request',
              resourceID: request_id,
              resourceAction: 'refund request transaction submitted',
              transactionHash,
            },
          })
        )
      })
      .flatMap((transactionHash: string) =>
        Observable.fromPromise(apolloSubscriber(transactionHash, 'RequestRefunded'))
      )
      .do(() => apolloClient.resetStore())
      .mapTo(
        showNotificationAction({
          notificationType: 'success',
          message: 'Request refund has been mined!',
          description: '1 block has been confirmed!',
        })
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

export const resubmitRequestEpic = (
  action$: Observable<ResubmitRequestAction>,
  { getState, dispatch }: any,
  { apolloClient, smartContracts, web3, apolloSubscriber, web3PersonalSign, getGasPrice }: Dependencies
) =>
  action$
    .ofType(RESUBMIT_REQUEST)
    .switchMap(({ payload: { request_id, bounty, content_hash, category, dead_line } }: ResubmitRequestAction) => {
      dead_line = moment(dead_line)
        .utc()
        .valueOf()
      console.log(dead_line)
      const weiBounty = web3.toWei(bounty, 'ether')

      return web3PersonalSign(
        request_id,
        request_id + web3.eth.accounts[0] + content_hash,
        storeRequestOwnershipSignature
      )
        .flatMap(() => getGasPrice())
        .flatMap(gasPrice =>
          smartContracts().KauriCore.addRequest.sendTransaction(
            request_id,
            web3.sha3(content_hash).toString('hex'),
            category,
            Math.floor(dead_line / 1000),
            weiBounty,
            {
              from: web3.eth.accounts[0],
              value: weiBounty,
              gas: 250000,
              gasPrice,
            }
          )
        )
        .do((transactionHash: string) => {
          dispatch(routeChangeAction(`/request/${request_id}/request-created`))
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
                resource: 'request',
                resourceID: request_id,
                resourceAction: 'request resubmitted transaction submitted',
                transactionHash,
              },
            })
          )
        })
        .flatMap((transactionHash: string) => Observable.fromPromise(apolloSubscriber(transactionHash, 'BountyAdded')))
        .do(h => console.log(h))
        .do(() => apolloClient.resetStore())
        .mapTo(
          showNotificationAction({
            notificationType: 'success',
            message: 'Request has been mined!',
            description: '1 block has been confirmed!',
          })
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
    })
