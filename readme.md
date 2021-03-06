# layer2-is-coming

Some tests on multiple layer2 cool networks that are getting nice reviews from the community. So far I tested `Optimism`, `Fantom`, `xDAI` and `Celo`.


## how to use

If you want to deploy to Optimism.

[What is Optmism?](https://optimism.io/)

[Twitch stream about Optimism Layer 2 development](https://www.twitch.tv/videos/863816992)

```
yarn install
yarn compile
node deploy_optimism.js
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

And all the others.. you get it.