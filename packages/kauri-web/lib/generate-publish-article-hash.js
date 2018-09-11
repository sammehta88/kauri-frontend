import bs58 from 'bs58'

const convertIpfsHash = ipfsHash => {
  const decoded = bs58.decode(ipfsHash)

  const result = `0x${decoded.slice(2).toString('hex')}`
  return result
}

const generatePublishArticleHash = (id, version, contentHash, contributor, dateCreated) => {
  const web3 = window.web3
  const keccak256 = function (...args) {
    args = args.map(arg => {
      if (typeof arg === 'string') {
        if (arg.substring(0, 2) === '0x') {
          return arg.slice(2)
        } else {
          return web3.toHex(arg).slice(2)
        }
      }

      if (typeof arg === 'number') {
        return web3.padLeft(arg.toString(16), 64, 0)
      } else {
        return ''
      }
    })

    args = args.join('')
    const result = web3.sha3(args, { encoding: 'hex' })
    console.log('generated article hash', result)
    return result
  }

  return keccak256(
    web3.padRight(web3.fromAscii(id), 66),
    version,
    contributor,
    web3.padRight(convertIpfsHash(contentHash), 66),
    new Date(dateCreated).getTime()
  )
}

export default generatePublishArticleHash
export { convertIpfsHash }
