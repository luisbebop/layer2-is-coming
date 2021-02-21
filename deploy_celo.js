require('dotenv').config()
require('console-stamp')(console, 'HH:MM:ss.l')
const { ContractFactory, ethers } = require ('ethers')
const { CeloProvider, CeloWallet} = require('@celo-tools/celo-ethers-wrapper')
const hre = require('hardhat')
const ElapsedTime = require('elapsed-time')

;(async() => {
  const pk = ethers.utils.mnemonicToEntropy(process.env.MNEMONIC)
  
  const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
  await provider.ready
  
  const wallet = new CeloWallet(pk, provider)

  console.log(wallet)

  // this is how ethers.getContractFactory works..
  // const factory = await ethers.getContractFactory('Storage')
  // "@nomiclabs/hardhat-ethers" injects this on ethers library
  const artifact = await hre.artifacts.readArtifact('Storage')
  // console.log(artifact.abi)
  // console.log(artifact.bytecode)

  const factory = new ContractFactory(artifact.abi, artifact.bytecode)
  // console.log(factory)

  console.log('connecting/deploying to contract')

  // const contract = await factory.connect(wallet).deploy()
  const contract = await factory.connect(wallet).attach("0x7FE256df07Cf9de5DfD1BFC458db0931406E6847")
  
  console.log('contract address at ' + contract.address)
  
  for(let i = 0; i < 100; i++) {
    const et = ElapsedTime.new().start()
    console.log('store number on contract')
    const t = await contract.store(i)
    const receipt = await wallet.provider.waitForTransaction(t.hash)
    console.log('%s number stored', et.getValue())

    console.log('reading number from contract')
    const output = (await contract.retrieve()).toNumber()
    console.log('number read: %d', output)
  }

})()