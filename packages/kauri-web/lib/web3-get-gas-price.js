// @flow

const web3 = global.window && global.window.web3

const getGasPrice = (): Promise<number> =>
  new Promise((resolve, reject) => {
    web3.eth.getGasPrice(
      (err, gasPriceBigNumber) =>
        err || !gasPriceBigNumber ? reject(err) : gasPriceBigNumber && resolve(gasPriceBigNumber.toNumber())
    )
  })

export { getGasPrice }
export default getGasPrice
