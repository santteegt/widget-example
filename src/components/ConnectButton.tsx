import * as React from "react";
import Button from "./Button";
import Core from "../core";

class ConnectButton extends React.Component<any, any> {
  public core: Core;

  constructor(props: any) {
    super(props);
    this.core = new Core({
      network: props.network,
      lightboxOpacity: props.lightboxOpacity,
      walletOptions: props.walletOptions,
      oceanOptions: props.oceanOptions
    });
    this.core.on("web3connected", props.onWeb3Connected);
    this.core.on("oceanconnected", props.onOceanConnected);
    this.core.on("disconnect", props.onDisconnect);
    this.core.on("close", props.onClose);
    this.core.on("error", props.onError);
  }

  public render = () => {
    return (
      <Button onClick={this.core.toggleModal} disabled={this.props.label == 'Connecting...'}>
        {this.props.label || "Connect"}
      </Button>
    );
  };
}

export default ConnectButton;
