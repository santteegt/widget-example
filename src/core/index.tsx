import React from "react";
import * as ReactDOM from "react-dom";
import WalletCore from './Core';
import { IWalletOptions, OceanOptions }from "../helpers/types";
import EventManager from "./events";

const WEB3_WALLET_MODAL_ID = "OCEAN_WALLET_MODAL_ID";

interface ICoreOptions {
  network?: string;
  modal?: boolean;
  lightboxOpacity?: number;
  // providerOptions?: IProviderOptions;
  walletOptions?: IWalletOptions
  oceanOptions: OceanOptions
}

const INITIAL_STATE = { show: false };

export default class Core {

  private show: boolean = INITIAL_STATE.show;
  private eventManager: EventManager = new EventManager();
  private lightboxOpacity: number = 0.4;

  private oceanOptions: OceanOptions = {} as any;

  walletOptions?: IWalletOptions;

  constructor(opts: ICoreOptions) {
    // this.injectedProvider = getInjectedProviderName();
    this.walletOptions = opts.walletOptions;

    // const providerOptions = {};
    console.log('opts', opts)
    // if (opts) {
    // this.network = opts.network;
    this.lightboxOpacity = opts.lightboxOpacity || 0.4;
    // this.providerOptions = opts.providerOptions || {};
    this.oceanOptions = opts.oceanOptions;

    // Injecting widget in the DOM
    this.renderModal();
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
    await window.updateModal(state);
  };

  public renderModal() {
    const el = document.createElement("div");
    el.id = WEB3_WALLET_MODAL_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <WalletCore
        lightboxOpacity={this.lightboxOpacity}
        walletOptions={this.walletOptions}
        oceanOptions={this.oceanOptions}
        eventManager={this.eventManager}
        onClose={this.onClose}
      />,
      document.getElementById(WEB3_WALLET_MODAL_ID)
    );

  }
}
