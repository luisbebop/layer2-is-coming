require('console-stamp')(console, 'HH:MM:ss.l')
const { l2ethers } = require('hardhat')

;(async() => {
  const provider = new l2ethers.providers.JsonRpcProvider('https://kovan.optimism.io')
  const wallet = new l2ethers.Wallet('0x' + 'ff'.repeat(64), provider)
    
  const factory = await l2ethers.getContractFactory('Storage')
  console.log('connecting/deploying to contract')
  
  //const contract = await factory.connect(wallet).deploy()
  const contract = await factory.connect(wallet).attach("0x33C2283C56946CA69CD373D021E743a45Ba09F92")
  
  console.log('contract address at ' + contract.address)
  
  for(let i = 0; i < 100; i++) {
    console.log('store number on contract')
    await contract.store(i)
    console.log('number stored')
  
    console.log('reading number from contract')
    const output = (await contract.retrieve()).toNumber()
    console.log('number read')
    console.log(output)
  }
  
})()