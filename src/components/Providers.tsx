import * as React from "react";
import Provider from "./Provider";

interface IProvidersProps {
  onLogIn: (boolean) => any;
  connectBurner: () => any;
  connectWallet: () => any;
}



class Providers extends React.Component<IProvidersProps, any> {

    public render = () => {
        const { onLogIn, connectBurner, connectWallet } = this.props;
        return(
            <div>
                <Provider name={"NewUser"} onClick={() => {
                    onLogIn(true)
                    connectBurner() 
                }} />
                <Provider name={"ConnectWallet"} onClick={() => connectWallet()} />
            </div>
        )
    }
}

export default Providers;
