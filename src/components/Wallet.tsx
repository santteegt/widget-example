import * as React from "react";
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from "@react-navigation/core";
import { createBrowserApp } from "@react-navigation/web";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faUserCircle, faWallet, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../assets/style.css'
// @ts-ignore
import NoProfile from "../assets/noProfile.png";


library.add(faTools, faUserCircle, faWallet, faCaretRight)

interface IWalletMenuProps {
    descriptors: any,
    navigation: any,
    screenProps: { hasAccount: boolean, logOut: any, createAccount: any }
}

interface IWalletProps {
  onLogOut: any;
}

interface IWalletState {
  hasAccount: boolean;
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

    render() {
        const { screenProps } = this.props
        // console.log('screenProps in ProfileScreen', screenProps)
        const hasAccount = screenProps.hasAccount;
        return (
            <div className="profile">
                <div className={!hasAccount ? "overlay" : "hidden" } onClick={() => {screenProps.createAccount();}}>
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


class WalletMenu extends React.Component<IWalletMenuProps> {
    render() {
        // console.log('===***', this.props)
        const { descriptors, navigation, screenProps } = this.props;
        // console.log('====+++===', this.props)
        const activeKey = navigation.state.routes[navigation.state.index].key;
        const descriptor = descriptors[activeKey];
        // const hasAccount =
        return (
        <div className="wallet">
          <div className="top">
            <a className="btn logout-btn" onClick={() => { screenProps.logOut(false); } }>Logout</a>
          </div>
          <div className="menu">
          <div className="menu-item">
            <a onClick={() => navigation.navigate('WalletScreen')} className={activeKey == 'WalletScreen' ? "active" : ""}><FontAwesomeIcon icon="wallet" /></a>
          </div>
          <div className="menu-item">
            <a onClick={() => navigation.navigate('ProfileScreen')} className={activeKey == 'ProfileScreen' ? "active" : ""}><FontAwesomeIcon icon="user-circle" /></a>
          </div>
          <div className="menu-item">
            <a onClick={() => navigation.navigate('ToolsScreen')} className={activeKey == 'ToolsScreen' ? "active" : ""}><FontAwesomeIcon icon="tools" /></a>
          </div>
          </div>
          <div className="content">
              <SceneView
                component={descriptor.getComponent()}
                navigation={descriptor.navigation}
                screenProps={screenProps}
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

class Wallet extends React.Component<IWalletProps, IWalletState> {

    state : IWalletState = { hasAccount: false }

    createAccount = () => {
        // TODO: manage account creation
        this.setState({hasAccount: true})
    }

    public render = () => {
        const { onLogOut } = this.props;
        return (
            <AppContainer screenProps={{ hasAccount: this.state.hasAccount, logOut: onLogOut, createAccount: this.createAccount }}/>
        );
    };
}

// const AppContainer = createAppContainer(WalletNavigator);

export default Wallet;
