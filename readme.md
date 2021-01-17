# optimism-sample

This is a smart contract demo running on Optimism Layer 2 testnet.

[What is Optmism?](https://optimism.io/)

[Twitch stream about Optimism Layer 2 development](https://www.twitch.tv/videos/863816992)


## how to use

```
yarn install
yarn compile
node deploy_omv.js
```

You can also deploy to xDai sidechain to compare performance. You will need a .env file in your directory with the mnemonic of your private key from an address that contains at least 1 xDAI so you can pay for deploy and smartcontract write calls.

```
MNEMONIC=your twelve words ...
```

Then

```
node deploy_xdai.js
```

Also you deploy on Rinkeby. Configure your .env with your MNEMONIC and your API key from Alchemy or Infura.

```
MNEMONIC=your twelve words ...
INFURAURL=your rinkeby url from infura
ALCHEMYURL=your rinkeby url from alchemy
```

Then

```
node deploy_rinkeby.js
```