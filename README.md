# Web3 Wallet for Data Marketplaces

A Web3 Wallet to enchance the user onboarding & UX when interacting with decentralized data markets

## Development

* Build Wallet component

```
npm run build
```

* Test it on an example App

```
cd example
npm install
npm start
```

# Former instructions from forked repo (IGNORE)

## Introduction

Web3Connect is an easy-to-use library to help developers add support for multiple providers in their apps with a simple customizable configuration.

By default Web3Connect Library supports injected providers like (**Metamask**, **Dapper**, **Gnosis Safe**, Web3 Browsers, etc) and **WalletConnect**, You can also easily configure the library to support **Portis**, **Fortmatic**, **Squarelink** and **Torus**.

## Preview

You can test the library on: https://web3connect.com/

## Usage

1. Install Web3Connect NPM package

```bash
npm install --save web3connect

# OR

yarn add web3connect
```

2. Install Provider packages

```bash
npm install --save @walletconnect/web3-provider @portis/web3 fortmatic squarelink @toruslabs/torus-embed

# OR

yarn add @walletconnect/web3-provider @portis/web3 fortmatic squarelink @toruslabs/torus-embed
```

3. Then you can integrate it three different ways:

- [React Button](#React-Button)
- [Core Module](#Core-Module)
- [Individual Connectors](#Individual-Connectors)

### React Button

Add Web3Connect Button to your React App as follows

```js
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Squarelink from "squarelink";
import Torus from "@toruslabs/torus-embed";

<Web3Connect.Button
  network="mainnet" // optional
  providerOptions={{
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "INFURA_ID" // required
      }
    },
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "FORTMATIC_KEY" // required
      }
    },
    squarelink: {
      package: Squarelink, // required
      options: {
        id: "SQUARELINK_ID" // required
      }
    },
    torus: {
      package: Torus, // required
      options: {
        enableLogging: false, // optional
        buttonPosition: "bottom-left", // optional
        buildEnv: "production", // optional
        showTorusButton: true // optional
      }
    }
  }}
  onConnect={(provider: any) => {
    const web3 = new Web3(provider); // add provider to web3
  }}
  onClose={() => {
    console.log("Web3Connect Modal Closed"); // modal has closed
  }}
/>;
```

### Core Module

Add Web3Connect Core to your Dapp as follows

```js
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Squarelink from "squarelink";
import Torus from "@toruslabs/torus-embed";

const web3Connect = new Web3Connect.Core({
  network: "mainnet", // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "INFURA_ID" // required
      }
    },
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "FORTMATIC_KEY" // required
      }
    },
    squarelink: {
      package: Squarelink, // required
      options: {
        id: "SQUARELINK_ID" // required
      }
    },
    torus: {
      package: Torus, // required
      options: {
        enableLogging: false, // optional
        buttonPosition: "bottom-left", // optional
        buildEnv: "production", // optional
        showTorusButton: true // optional
      }
    }
  }
});

// subscribe to connect
web3Connect.on("connect", (provider: any) => {
  const web3 = new Web3(provider); // add provider to web3
});

// subscribe to close
web3Connect.on("close", () => {
  console.log("Web3Connect Modal Closed"); // modal has closed
});

web3Connect.toggleModal(); // open modal on button click
```

## Collaboration

### Code contributions are welcome ❤️❤️❤️!

If you wish to support a new provider submit a issue to the repo or fork this repo and create a pull request.

You can join to our discord to further discuss https://discordapp.com/invite/YGnSX9y
