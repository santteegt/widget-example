import React from "react";
import Web3 from "web3";
import { Ocean } from '@oceanprotocol/squid';
import Web3Connect from "web3connect";
import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
import { Widget } from './context';
import Modal from "../components/Modal";
import { IWalletOptions, OceanOptions }from "../helpers/types";
import EventManager from "./events";

interface ICoreProps {
  network?: string
  modal?: boolean
  lightboxOpacity: number
  walletOptions?: IWalletOptions
  oceanOptions: OceanOptions
  eventManager: EventManager
  onClose: () => void
}

interface ICoreState {
  isLoggedIn: boolean
  isLoading: boolean
  account: string
  web3: Web3 | undefined
  ocean: Ocean | undefined
  box: any | undefined
  balance: any
  network: string
  openWalletProvider: () => void
  requestFromFaucet: () => void
  airdropOceanTokens: () => void
  loginWallet: () => void
  loginBurnerWallet: () => void
  logout: () => void
  message: string

}

const INITIAL_WALLET_STATE = {
  isLoggedIn: false,
  isLoading: false,
  account: '',
  web3: undefined,
  ocean: undefined,
  box: undefined,
  balance: {
      eth: 0,
      ocn: 0
  },
  network: ''
}


export default class WalletCore extends React.Component<ICoreProps, ICoreState> {

  // private show: boolean = INITIAL_STATE.show;
  private eventManager: EventManager;

  private network: string | undefined = undefined;
  // private lightboxOpacity: number = 0.4;

  private web3Connect: any = null;

  public state:ICoreState;

  constructor(props: ICoreProps) {
    super(props);
    // this.injectedProvider = getInjectedProviderName();

    const providerOptions = {};
    console.log('opts', props)
    // if (opts) {
    this.eventManager = props.eventManager;
    this.network = props.network;

    if (props.walletOptions) {

      const walletOpts = props.walletOptions;

      if (walletOpts.portisEnabled && walletOpts.portisAppId) {
        providerOptions['portis'] = {
          package: Portis,
          options: {
            id: walletOpts.portisAppId
          }
        }
      }

      if (walletOpts.torusEnabled) {
        providerOptions['torus'] = {
          package: Torus, // required
          options: {
            enableLogging: false, // optional
            buttonPosition: "bottom-left", // optional
            buildEnv: "production", // optional
            showTorusButton: true // optional
          }
        }
      }
    }

    if (!this.network) {
      // Default network for burner wallet
      this.network = 'local';
    }

    // Loading Web3Connect
    this.web3Connect = new Web3Connect.Core({ providerOptions });

    // // subscribe to connect
    this.web3Connect.on("connect", (provider: any) => {
      console.log('CONNECT TO WALLET', provider)
      this.onConnect(new Web3(provider));
    });

    // // subscribe to close
    this.web3Connect.on("close", () => {
      console.log("Web3Connect Modal Closed"); // modal has closed
      this.props.onClose()
    });

    // // subscribe to error
    this.web3Connect.on("close", (error: any) => {
      console.log("Web3Connect ERROR", error); // modal has closed
      this.onError(error);
    });

    // this.providers = this.getProviders();

    // this.renderModal();
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      account: '',
      web3: undefined,
      ocean: undefined,
      box: undefined,
      balance: {
          eth: 0,
          ocn: 0
      },
      network: '',
      openWalletProvider: () => {
          /* empty */
      },
      requestFromFaucet: () => {
          /* empty */
      },
      airdropOceanTokens: () => {
          /* empty */
      },
      loginWallet: this.connectWallet,
      loginBurnerWallet: () => {
          /* empty */
      },
      logout: () => {
        console.log('Calling logout')
        this.resetState()
      },
      message: ''
    }
  }

  public componentDidMount() {
    console.log('CORE mounted')
  }

  private connectWallet = async () => {
    console.log('==connectWallet==')
    this.web3Connect.toggleModal()
  }

  private onError = async (error: any) => {
    console.log('onError', error)
    this.eventManager.trigger("error", error);
  };

  private onConnect = async (web3: Web3) => {
    console.log('onConnect')
    // this.web3 = web3;
    web3.eth.getAccounts().then(accounts => {
      console.log('ACCOUNTS', accounts)
      this.setState({ account: accounts[0], web3 })
    })
    this.eventManager.trigger("web3connected", web3);
  };

  private resetState = () => {
    this.setState( INITIAL_WALLET_STATE );
  }

  public render() {

    console.log('WalletCore state', this.state)

    return (
      <Widget.Provider value={this.state}>
        <Modal
        onClose={this.props.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.props.lightboxOpacity}
        />
      </Widget.Provider>
    )
  }
}
