import * as React from "react";
import * as ReactDOM from "react-dom";
// import Web3 from "web3";
// import Web3Connect from "web3connect";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Portis from "@portis/web3";
// import Squarelink from "squarelink";
// import Fortmatic from "fortmatic";
// import Torus from "@toruslabs/torus-embed";
// import Arkane from "@arkane-network/web3-arkane-provider";
// import Authereum from "authereum";
import Modal from "../components/Modal";
// import { IProviderOptions  IProviderCallback } from "../helpers/types";
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
}

const INITIAL_STATE = { show: false };

class Core {
  private show: boolean = INITIAL_STATE.show;
  private eventManager: EventManager = new EventManager();
  // private injectedProvider: string | null = null;
  // private network: string = "";
  private lightboxOpacity: number = 0.4;
  // private providerOptions: IProviderOptions = {};
  // private providers: IProviderCallback[];
  // private web3Connect: any = null;

  constructor(opts?: ICoreOptions) {
    // this.injectedProvider = getInjectedProviderName();

    // console.log('injectedProvider', this.injectedProvider)

    if (opts) {
      // this.network = opts.network || "";
      this.lightboxOpacity = opts.lightboxOpacity || 0.4;
      // this.providerOptions = opts.providerOptions || {};
    }

    this.renderModal();

    // this.web3Connect = new Web3Connect.Core({
    //   network: "mainnet", // optional
    //   providerOptions: {
    //     walletconnect: {
    //       package: WalletConnectProvider, // required
    //       options: {
    //         infuraId: "efe2d9ee8dd74c9b87b6c9e65bc785d7" // required
    //       }
    //     },
    //     portis: {
    //       package: Portis, // required
    //       options: {
    //         id: "4a9e93e9-e416-489e-8bee-3c3229f7da2e" // required
    //       }
    //     },
    // //     // fortmatic: {
    // //     //   package: Fortmatic, // required
    // //     //   options: {
    // //     //     key: "FORTMATIC_KEY" // required
    // //     //   }
    // //     // },
    // //     squarelink: {
    // //       package: Squarelink, // required
    // //       options: {
    // //         id: "SQUARELINK_ID" // required
    // //       }
    // //     },
    //     // torus: {
    //     //   package: Torus, // required
    //     //   options: {
    //     //     enableLogging: false, // optional
    //     //     buttonPosition: "bottom-left", // optional
    //     //     buildEnv: "production", // optional
    //     //     showTorusButton: true // optional
    //     //   }
    //     // },
    //     // arkane: {
    //     //   package: Arkane, // required
    //     //   options: {
    //     //     clientId: "ARKANE_CLIENT_ID" // required, replace
    //     //   }
    //     // },
    //     // authereum: {
    //     //   package: Authereum, // required
    //     //   options: {}
    //     // }
    //   }
    // });

    // // // subscribe to connect
    // this.web3Connect.on("connect", (provider: any) => {
    //   console.log('CONNECT TO WALLET', provider)
    //   // const web3 = new Web3(provider); // add provider to web3
    // });

    // // // subscribe to close
    // this.web3Connect.on("close", () => {
    //   console.log("Web3Connect Modal Closed"); // modal has closed
    //   this.toggleModal()
    // });

    // // // subscribe to error
    // this.web3Connect.on("close", (error: any) => {
    //   console.log("Web3Connect ERROR", error); // modal has closed
    // });

    // this.providers = this.getProviders();

    // this.renderModal();
  }

  public on(event: string, callback: (result: any) => void): void {
    this.eventManager.on({
      event,
      callback
    });
  }

  // public connectToInjected = async () => {
  //   try {
  //     const provider = await connectors.ConnectToInjected();
  //     await this.onConnect(provider);
  //   } catch (error) {
  //     await this.onError(error);
  //   }
  // };

  // public connectTo = async (
  //   name: string,
  //   connector: (providerPackage: any, opts: any) => Promise<any>
  // ) => {
  //   try {
  //     const providerPackage =
  //       this.providerOptions &&
  //       this.providerOptions[name] &&
  //       this.providerOptions[name].package
  //         ? this.providerOptions[name].package
  //         : {};
  //     const providerOptions =
  //       this.providerOptions &&
  //       this.providerOptions[name] &&
  //       this.providerOptions[name].options
  //         ? this.providerOptions[name].options
  //         : {};
  //     const opts = this.network
  //       ? { network: this.network, ...providerOptions }
  //       : providerOptions;
  //     const provider = await connector(providerPackage, opts);
  //     await this.onConnect(provider);
  //   } catch (error) {
  //     await this.onError(error);
  //   }
  // };

  public toggleModal = async () => {
    // if (
    //   this.providers &&
    //   this.providers.length === 1 &&
    //   this.providers[0].name
    // ) {
    //   await this.providers[0].onClick();
    //   return;
    // }

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

  // public shouldDisplayProvider(name: string) {
  //   const { providerOptions } = this;
  //   const providerPackage = providerPackages[name];

  //   if (providerOptions) {
  //     const providerPackageOptions = providerOptions[providerPackage.option];

  //     if (providerPackageOptions) {
  //       const isProvided = providerPackageOptions.package;
  //       if (isProvided) {
  //         const required = providerPackage.required;
  //         if (required.length) {
  //           const providedOptions = providerPackageOptions.options;
  //           if (providedOptions && Object.keys(providedOptions).length) {
  //             const matches = required.filter(
  //               (key: string) => key in providedOptions
  //             );
  //             if (required.length === matches.length) {
  //               return true;
  //             }
  //           }
  //         } else {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // public getProviders = () => {
  //   const mobile = isMobile();

  //   let providers = [
  //     "injected",
  //     "walletconnect",
  //     "portis",
  //     "fortmatic",
  //     "squarelink",
  //     "torus"
  //   ];

  //   const { injectedProvider, providerOptions } = this;

  //   const displayInjected =
  //     injectedProvider && !providerOptions.disableInjectedProvider;

  //   const onlyInjected = displayInjected && mobile;

  //   if (onlyInjected) {
  //     providers = ["injected"];
  //   } else {
  //     if (!displayInjected) {
  //       providers = providers.filter(provider => provider !== "injected");
  //     }

  //     if (!this.shouldDisplayProvider("walletconnect")) {
  //       providers = providers.filter(provider => provider !== "walletconnect");
  //     }

  //     if (!this.shouldDisplayProvider("portis")) {
  //       providers = providers.filter(provider => provider !== "portis");
  //     }

  //     if (!this.shouldDisplayProvider("fortmatic")) {
  //       providers = providers.filter(provider => provider !== "fortmatic");
  //     }

  //     if (!this.shouldDisplayProvider("squarelink")) {
  //       providers = providers.filter(provider => provider !== "squarelink");
  //     }

  //     if (!this.shouldDisplayProvider("torus")) {
  //       providers = providers.filter(provider => provider !== "torus");
  //     }
  //   }

  //   const providersMap = providers.map(provider => {
  //     switch (provider) {
  //       case "injected":
  //         return {
  //           name: injectedProvider,
  //           onClick: this.connectToInjected
  //         };
  //       case "walletconnect":
  //         return {
  //           name: "WalletConnect",
  //           onClick: () =>
  //             this.connectTo("walletconnect", connectors.ConnectToWalletConnect)
  //         };
  //       case "portis":
  //         return {
  //           name: "Portis",
  //           onClick: () => this.connectTo("portis", connectors.ConnectToPortis)
  //         };
  //       case "fortmatic":
  //         return {
  //           name: "Fortmatic",
  //           onClick: () =>
  //             this.connectTo("fortmatic", connectors.ConnectToFortmatic)
  //         };
  //       case "squarelink":
  //         return {
  //           name: "Squarelink",
  //           onClick: () =>
  //             this.connectTo("squarelink", connectors.ConnectToSquarelink)
  //         };
  //       case "torus":
  //         return {
  //           name: "Google",
  //           onClick: () => this.connectTo("torus", connectors.ConnectToTorus)
  //         };

  //       default:
  //         return {
  //           name: "",
  //           onClick: async () => {
  //             // empty
  //           }
  //         };
  //     }
  //   });

  //   return providersMap;
  // };

  private connectBurner = async () => {
    console.log('==connectBurner')
    this.onError(new Error("test error"))
  }

  private connectWallet = async () => {
    console.log('==connectWallet==')
    // this.toggleModal()
    // this.web3Connect.toggleModal()
    this.onConnect({'a': 'provider'})
  }

  private onError = async (error: any) => {
    console.log('onError', error)
  //   if (this.show) {
  //     await this.toggleModal();
  //   }
  //   this.eventManager.trigger("error", error);
  };

  private onConnect = async (provider: any) => {
    console.log('onConnect', provider)
  //   if (this.show) {
  //     await this.toggleModal();
  //   }
  //   this.eventManager.trigger("connect", provider);
  };

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
    await window.updateWeb3ConnectModal(state);
  };

  private resetState = () => this.updateState({ ...INITIAL_STATE });

  public renderModal() {
    const el = document.createElement("div");
    el.id = WEB3_WALLET_MODAL_ID;
    document.body.appendChild(el);

    // console.log("RENDER MODAL", this.providers)

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

export default Core;
