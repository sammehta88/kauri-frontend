const web3 = window.web3

utils.keccak256(
  web3.padRight(web3.fromAscii(id), 66),
  resultArt.version,
  web3.padRight(web3.fromAscii(request_id), 66),
  web3.padRight(utils.convertIpfsHash(content_hash), 66),
  web3.padRight(web3.fromAscii(category), 66),
  '0x' + contributor
)
