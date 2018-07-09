import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import fetch from 'isomorphic-unfetch'
import config from '../../../config'
import { fetchEthUsdPriceAction, ethUsdPriceEpic } from '../../../lib/Module'

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

describe('Ether USD price epic', () => {
  it('should call cryptocompare api and put it in the redux store', async () => {
    global.process.env.ethUsdPriceEndpoint = config.default.ethUsdPriceEndpoint
    const sourceAction = fetchEthUsdPriceAction()
    const expectedActions = [
      {
        type: 'SET_ETH_USD_PRICE',
        payload: { price: expect.any(Number) },
      },
    ]

    const resultingActions = await testEpic(
      ethUsdPriceEpic,
      sourceAction,
      {},
      {
        fetch,
      }
    )

    expect(resultingActions).toEqual(expectedActions)
  })
})
