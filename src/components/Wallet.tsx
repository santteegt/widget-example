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
// @ts-ignore
import NoProfile from "../assets/noProfile.png";


library.add(faTools, faUserCircle, faWallet, faCaretRight)

interface IWalletProps {
    descriptors: any,
    navigation: any
}

class WalletScreen extends React.Component<any, any> {

  navigationOptions = {
    title: "Wallet",
    linkName: "Wallet Page"
  };

  componentDidMount() {
    console.log('WALLETSCREEN MOUNTED', this.props)
  }

  render() {
    // console.log('WALLETSCREEN RENDEr', this.props)
    return (
      <div>
        <h2>Wallet</h2>
        <div className="top-content-area">
          <div className="row">
              <img src={NoProfile} />
              <span>Name</span>
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
}


class ProfileScreen extends React.Component<any, any> {

    navigationOptions = {
      title: "Wallet",
      linkName: "Wallet Page"
    };

    state = {
      hasAccount: false
    }

    createAccount = () => {
      // TODO: manage account creation 
      this.setState({hasAccount: true})
    }

    render() {
        // const { screenProps } = this.props
        // console.log('screenProps', screenProps)
        const { hasAccount } = this.state
        return (
            <div className="profile">
                <div className={!hasAccount ? "overlay" : "hidden" } onClick={() => {this.createAccount();}}>
                    <a className="btn">Create Profile</a>
                </div>
            <h2>Profile</h2>
            <div className="profile-content-area">
                <div className="row user-info">
                    <img src={NoProfile} />
                    <div>
                    <p>John Doe</p>
                    <span>Role</span>
                    <span>Institution</span>
                    </div>
                    </div>
                    <div className="row counters">
                    <span>10<br />Datasets</span>
                    <span>100<br />Followers</span>
                    <span>100<br />Following</span>
                    </div>
                    <div className="row">
                    <p>Profile Description</p>
                    <a className="btn">Save Profile</a>
                    </div>
                </div>
            </div>
        );
    }

}


class ToolsScreen extends React.Component<any, any> {

    navigationOptions = {
      title: "Wallet",
      linkName: "Wallet Page"
    };

    render(){
        return (
            <div>
            <h2>Tools</h2>
            </div>
        );
    }

}


class WalletMenu extends React.Component<IWalletProps> {
    render() {
        const { descriptors, navigation } = this.props;
        // console.log('====+++===', this.props)
        const activeKey = navigation.state.routes[navigation.state.index].key;
        const descriptor = descriptors[activeKey];
        // const hasAccount =
        return (
        <div className="wallet">
          <div className="top">
            <a className="btn logout-btn" onClick={() => {} }>Logout</a>
          </div>
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
                screenProps={{isLoggedIn: false}}
              />
              </div>
        </div>
        );
  }
}

const WalletNavigator = createNavigator(
    WalletMenu,
    SwitchRouter({
      WalletScreen: {
        screen: WalletScreen,
        path: ''
      },
      ProfileScreen: {
        screen: ProfileScreen,
        path: ''
      },
      ToolsScreen: {
        screen: ToolsScreen,
        path: ''
      }
    }),
    {
        initialRouteName: "WalletScreen"
    }
);

const AppContainer = createBrowserApp(WalletNavigator);


class Wallet extends React.Component {

  public render = () => {
    return (
      <AppContainer/>
    );
  };
}

// const AppContainer = createAppContainer(WalletNavigator);

export default Wallet;
