var Web3 = require('web3')
var contract = require('truffle-contract')
var config = require('../config/index').default
var web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.gethBlockchain}`))
var execSync = require('child_process').execSync
;(async () => {
  // ########################################################################################################
  // ########################################################################################################
  // IMPORTS

  // ########################################################################################################
  // ########################################################################################################
  // CONSTANT
  console.log('##### Constant ...')
  var fromAddress = web3.eth.coinbase
  console.log('fromAddress ', fromAddress)
  var toAddress = '0xbfecec47dd8bf5f6264a9830a9d26ef387c38a67'
  console.log('toAddress ', toAddress)
  const _TOPIC = 'kauri'
  const _TOPIC2 = 'metamask'
  console.log(config.gethBlockchain)
  console.log('##### Constant done!')

  console.log('##### Setup WEB3JS done!')

  // ########################################################################################################
  // ########################################################################################################
  // Send ETH to ADDRESS
  // ########################################################################################################
  // ########################################################################################################
  // GET CONTRACTS INSTANCE
  console.log('##### Getting contract instances ...')
  console.log('Pulling latest contracts down from docker container')
  execSync('gcloud docker -- pull gcr.io/kauri-197812/kauri-contract-abis:latest-dev')
  console.log('Remove existing contracts')
  console.log('Copying smart contracts from inside container to flow repo directory')
  execSync(
    'docker run -v /Users/rej156/Documents/flow/smart-contracts/build:/tmp gcr.io/kauri-197812/kauri-contract-abis:latest-dev sh -c "rm -rf /tmp/*; mv /contracts /tmp/"'
  )
  const contract = require('truffle-contract')
  const MODERATOR_JSON = require('/Users/rej156/Documents/flow/smart-contracts/build/contracts/TopicModerator.json')
  console.log('##### Getting contract instances ...')
  const topicModeratorContractDeployedAddress = MODERATOR_JSON.networks[Object.keys(MODERATOR_JSON.networks)[0]].address
  console.log('##### DEPLOYED TOPIC MODERATOR CONTRACT ADDRESS', topicModeratorContractDeployedAddress)
  var topicModeratorContractInstance = contract(MODERATOR_JSON)
  topicModeratorContractInstance.setProvider(new Web3.providers.HttpProvider(`http://${config.gethBlockchain}`))
  topicModeratorContractInstance = await topicModeratorContractInstance.deployed()
  // await topicModeratorContractInstance.setProvider(web3.currentProvider)
  // const deployedTopicModeratorContract = await topicModeratorContractInstance.deploy()
  console.log('topicModeratorContractDeployedAddress', topicModeratorContractDeployedAddress)
  console.log('##### Getting contract instances done')
  // TODO: USE WEB3.Contract

  // ########################################################################################################
  // ########################################################################################################
  // ADD ACCOUNT AS MODERATOR
  console.log(`##### Making ${toAddress}, a moderator of ${_TOPIC} and ${_TOPIC2}...`)

  let tx = await topicModeratorContractInstance.addModerator(web3.fromAscii(_TOPIC), toAddress, {
    from: fromAddress,
    gas: 2000000,
    gasPrice: web3.toWei(500, 'gwei'),
  })
  console.log(tx)

  tx = await topicModeratorContractInstance.addModerator(web3.fromAscii(_TOPIC2), toAddress, {
    from: fromAddress,
    gas: 2000000,
    gasPrice: web3.toWei(500, 'gwei'),
  })
  console.log(tx)

  tx = await topicModeratorContractInstance.isTopic(web3.fromAscii(_TOPIC))
  console.log(tx)

  tx = await topicModeratorContractInstance.isTopic(web3.fromAscii(_TOPIC2))
  console.log(tx)

  tx = await topicModeratorContractInstance.getModeratorTopics(toAddress)
  console.log(tx)

  console.log('##### Adding  moderator done !')
})().catch(err => console.error(err))
