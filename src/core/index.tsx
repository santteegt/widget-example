import React from "react";
import * as ReactDOM from "react-dom";
import Web3 from "web3";
import { Ocean } from '@oceanprotocol/squid';
import Web3Connect from "web3connect";
import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
import { provideOcean } from "./ocean";
import Modal from "../components/Modal";
// import { IProviderOptions  IProviderCallback } 
import { IWalletOptions, OceanOptions }from "../helpers/types";
// import {
  // isMobile,
  // getInjectedProviderName
// } from "../helpers/utils";
// import connectors from "./connectors";
import EventManager from "./events";
// import { providerPackages } from "../providers";

const WEB3_WALLET_MODAL_ID = "OCEAN_WALLET_MODAL_ID";

interface ICoreOptions {
  modal?: boolean;
  network?: string;
  lightboxOpacity?: number;
  // providerOptions?: IProviderOptions;
  walletOptions?: IWalletOptions
  oceanOptions: OceanOptions
}

const INITIAL_STATE = { show: false };

export default class Core {

  private show: boolean = INITIAL_STATE.show;
  private eventManager: EventManager = new EventManager();
  // private injectedProvider: string | null = null;
  // private network: string = "";
  private lightboxOpacity: number = 0.4;
  // private providerOptions: IProviderOptions = {};
  // private providers: IProviderCallback[];
  private web3Connect: any = null;

  private web3?: Web3;

  private ocean?: Ocean;

  private oceanOptions: OceanOptions = {} as any;

  constructor(opts: ICoreOptions) {
    // this.injectedProvider = getInjectedProviderName();

    const providerOptions = {};
    console.log('opts', opts)
    // if (opts) {
      // this.network = opts.network || "";
    this.lightboxOpacity = opts.lightboxOpacity || 0.4;
    // this.providerOptions = opts.providerOptions || {};
    this.oceanOptions = opts.oceanOptions;

    if (opts.walletOptions) {

      const walletOpts = opts.walletOptions;

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

    // Injecting widget in the DOM
    this.renderModal();

    // Loading Web3Connect
    this.web3Connect = new Web3Connect.Core({ providerOptions });

    // // subscribe to connect
    this.web3Connect.on("connect", (provider: any) => {
      console.log('CONNECT TO WALLET', provider)
      this.web3 = new Web3(provider);
      this.eventManager.trigger("web3connected", this.web3);
      if (this.oceanOptions && this.oceanOptions.enabled) {
        console.log('OP OPtions', this.oceanOptions.settings)
        provideOcean(this.web3, this.oceanOptions.settings).then((instance: Ocean) => {
          this.ocean = instance;
          this.eventManager.trigger("oceanconnected", this.ocean);
        }).catch((error) => this.eventManager.trigger("error", error));
      }
    });

    // // subscribe to close
    this.web3Connect.on("close", () => {
      console.log("Web3Connect Modal Closed"); // modal has closed
      this.toggleModal();
      this.eventManager.trigger("close");
    });

    // // subscribe to error
    this.web3Connect.on("close", (error: any) => {
      console.log("Web3Connect ERROR", error); // modal has closed
      this.eventManager.trigger("error", error);
    });

    // this.providers = this.getProviders();

    // this.renderModal();
  }

  public on(event: string, callback: (result: any) => void): void {
    this.eventManager.on({
      event,
      callback
    });
  }

  public toggleModal = async () => {
    const d = typeof window !== "undefined" ? document : "";
    const body = d ? d.body || d.getElementsByTagName("body")[0] : "";
    if (body) {
      if (this.show) {
        body.style.overflow = "";
      } else {
        body.style.overflow = "hidden";
      }
    }
    await this.updateState({ show: !this.show });
  };

  private connectBurner = async () => {
    console.log('==connectBurner')
    this.onError(new Error("test error"))
  }

  private connectWallet = async () => {
    console.log('==connectWallet==')
    this.web3Connect.toggleModal()
    // this.onConnect({'a': 'provider'})
  }

  private onError = async (error: any) => {
    console.log('onError', error)
  //   if (this.show) {
  //     await this.toggleModal();
  //   }
  //   this.eventManager.trigger("error", error);
  };

  // private onConnect = async (provider: any) => {
  //   console.log('onConnect', provider)
  // //   if (this.show) {
  // //     await this.toggleModal();
  // //   }
  //   this.eventManager.trigger("connect", provider);
  // };

  private onClose = async () => {
    if (this.show) {
      await this.toggleModal();
    }
    this.eventManager.trigger("close");
  };

  private updateState = async (state: any) => {
    Object.keys(state).forEach(key => {
      this[key] = state[key];
    });
    await window.updateOceanWalletModal(state);
  };

  private resetState = () => this.updateState({ ...INITIAL_STATE });

  public renderModal() {
    const el = document.createElement("div");
    el.id = WEB3_WALLET_MODAL_ID;
    document.body.appendChild(el);

    // ReactDOM.render(
    //   <Modal
    //     providers={this.providers}
    //     onClose={this.onClose}
    //     resetState={this.resetState}
    //     lightboxOpacity={this.lightboxOpacity}
    //   />,
    //   document.getElementById(WEB3_WALLET_MODAL_ID)
    // );
    ReactDOM.render(
      <Modal
        connectBurner={this.connectBurner}
        connectWallet={this.connectWallet}
        onClose={this.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.lightboxOpacity}
      />,
      document.getElementById(WEB3_WALLET_MODAL_ID)
    );
  }
}
