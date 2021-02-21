require('dotenv').config()
require('console-stamp')(console, 'HH:MM:ss.l')
const { ethers } = require('hardhat')
const ElapsedTime = require('elapsed-time')

;(async() => {
  const pk = ethers.utils.mnemonicToEntropy(process.env.MNEMONIC)

  const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.fantom.network/')
  const wallet = new ethers.Wallet(pk, provider)
  console.log(wallet)

  const factory = await ethers.getContractFactory('Storage')
  console.log('connecting/deploying to contract')

  // const contract = await factory.connect(wallet).deploy({gasLimit: 210000})
  const contract = await factory.connect(wallet).attach("0x7FE256df07Cf9de5DfD1BFC458db0931406E6847")

  console.log('contract address at ' + contract.address)
  
  for(let i = 0; i < 100; i++) {
    const et = ElapsedTime.new().start()
    console.log('store number on contract')
    const t = await contract.store(i, {gasLimit: 210000})
    const receipt = await wallet.provider.waitForTransaction(t.hash)
    console.log('%s number stored', et.getValue())

    console.log('reading number from contract')
    const output = (await contract.retrieve()).toNumber()
    console.log('number read: %d', output)
  }

})()