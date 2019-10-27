import * as React from "react";
import Provider from "./Provider";

interface IProvidersProps {
  onLogIn: any;
}



class Providers extends React.Component<IProvidersProps, any> {

    public render = () => {
        const { onLogIn } = this.props;
        return(
            <div>
                <Provider name={"NewUser"} onClick={() => onLogIn(true) } />
                <Provider name={"ConnectWallet"} onClick={() => console.log("Click event")} />
            </div>
        )
    }
}

export default Providers;
