import { IProviderInfo } from "../helpers/types";
// @ts-ignore
import Web3DefaultLogo from "../assets/web3-default.svg";
// @ts-ignore
import NewUserLogo from "../assets/newUser.png";
// @ts-ignore
import WalletLogo from "../assets/wallet.png";

export const providerPackages = {
  walletconnect: {
    name: "@walletconnect/web3-provider",
    option: "walletconnect",
    required: ["infuraId"]
  },
  portis: {
    name: "@portis/web3",
    option: "portis",
    required: ["id"]
  },
  fortmatic: {
    name: "fortmatic",
    option: "fortmatic",
    required: ["key"]
  },
  squarelink: {
    name: "squarelink",
    option: "squarelink",
    required: ["id"]
  },
  torus: {
    name: "@toruslabs/torus-embed",
    option: "torus",
    required: []
  }
};

export const fallbackProvider: IProviderInfo = {
  name: "Web3",
  logo: Web3DefaultLogo,
  type: "injected",
  check: "isWeb3",
  styled: {
    noShadow: false
  }
};

const providers: IProviderInfo[] = [
  fallbackProvider,
  {
    name: "NewUser",
    logo: NewUserLogo,
    type: "web",
    check: "isNewUser",
    styled: {
      noShadow: true
    }
  },
  {
    name: "ConnectWallet",
    logo: WalletLogo,
    type: "web",
    check: "isWallet",
    styled: {
      noShadow: true
    }
  }
];

export default providers;
