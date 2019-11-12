import * as React from 'react';
import Provider from './Provider';
import { Widget } from '../core/context';

interface IProvidersProps {
  onLogIn: (boolean) => any;
  connectBurner: () => any;
  connectWallet: () => any;
}



class Providers extends React.Component<IProvidersProps, any> {

    public static contextType = Widget

    public render = () => {
        const { onLogIn, connectBurner, connectWallet } = this.props;
        return(
            <div>
                <Provider name={"NewUser"} onClick={() => {
                    onLogIn(true)
                    connectBurner()
                }} />
                <Provider name={"ConnectWallet"} onClick={() => {
                    onLogIn(true)
                    connectWallet()
                }} />
            </div>
        )
    }
}

export default Providers;
