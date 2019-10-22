import * as React from "react";
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from "@react-navigation/core";
import { createBrowserApp, Link } from "@react-navigation/web";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faUserCircle, faWallet, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../assets/style.css'
// import noProfile from '../assets/noProfile.png'

library.add(faTools, faUserCircle, faWallet, faCaretRight)

interface IWalletProps {
    descriptors: any,
    navigation: any
}

function WalletScreen() {
  return (
    <div>
      <h2>Wallet</h2>
      <div className="top-content-area">
        <div className="row">
            <img src="../assets/noProfile.png" />
            <span>Name</span>
            <a className="btn">Logout</a>
        </div>
      </div>
      <div className="info-content-area">
            <div className="row">
              <div className="label">Adress:</div>
              <div className="value">0x2d21c5d5e1f2c65d67489641d31c654df64</div>
              <div className="action"></div>
            </div>
            <div className="row">
              <div className="label">Network:</div>
              <div className="value">Ethereum (Mainnet)<br />10.00 ETH / 100.99 OCN</div>
              <div className="action"><FontAwesomeIcon icon="caret-right" /></div>
            </div>
            <div className="row">
              <div className="label">Ocean Network:</div>
              <div className="value">Pacific<br />10.00 POA / 100.99 OCN</div>
              <div className="action"><FontAwesomeIcon icon="caret-right" /></div>
            </div>
            <div className="row">
                <a className="btn">Open Wallet Provider</a>
            </div>
      </div>
    </div>
  );
}
WalletScreen.path = "";
WalletScreen.navigationOptions = {
  title: "Wallet",
  linkName: "Wallet Page"
};


function ProfileScreen() {
  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
}
ProfileScreen.path = "";
ProfileScreen.navigationOptions = {
  title: "Profile",
  linkName: "Profile Page"
};

function ToolsScreen() {
  return (
    <div>
      <h2>Tools</h2>
    </div>
  );
}
ToolsScreen.path = "";
ToolsScreen.navigationOptions = {
  title: "Tools",
  linkName: "Tools Page"
};



class WalletMenu extends React.Component<IWalletProps> {
    render() {
        const { descriptors, navigation } = this.props;
        const activeKey = navigation.state.routes[navigation.state.index].key;
        const descriptor = descriptors[activeKey];
        return (
        <div>
          <div className="menu">
          <div className="menu-item">
            <Link routeName="WalletScreen"><FontAwesomeIcon icon="wallet" /></Link>
          </div>
          <div className="menu-item">
            <Link routeName="ProfileScreen"><FontAwesomeIcon icon="user-circle" /></Link>
          </div>
          <div className="menu-item">
            <Link routeName="ToolsScreen"><FontAwesomeIcon icon="tools" /></Link>
          </div>
          </div>
          <div className="content">
              <SceneView
                component={descriptor.getComponent()}
                navigation={descriptor.navigation}
              />
              </div>
        </div>
        );
  }
}

const WalletNavigator = createNavigator(
    WalletMenu,
    SwitchRouter({
      WalletScreen,
      ProfileScreen,
      ToolsScreen
    }),
    {}
    // {
    //   Wallet: WalletScreen,
    //   Profile: ProfileScreen,
    //   Tools: ToolsScreen,
    // },
    // {
    //   initialRouteName: 'Home',
    // }
);

const AppContainer = createBrowserApp(WalletNavigator);


class Wallet extends React.Component {

  public render = () => {
    return (
      <AppContainer />
    );
  };
}

// const AppContainer = createAppContainer(WalletNavigator);

export default Wallet;
