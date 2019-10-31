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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../assets/style.css'
import Tool from './Tool';
// @ts-ignore
import NoProfile from "../assets/noProfile.png";


library.add(faTools, faUserCircle, faWallet, faCaretRight)

interface IWalletMenuProps {
    descriptors: any,
    navigation: any,
    screenProps: { hasAccount: boolean, logOut: any, createAccount: any, copied: boolean }
}

interface IWalletProps {
  onLogOut: any;
}

interface IWalletState {
  hasAccount: boolean;
}

class MainMenu extends React.Component<any, any> {


    render() {
        const { navigation, logOut } = this.props
        let activeKey = 'WalletScreen'
        if(navigation.state.index){
            activeKey = navigation.state.routes[navigation.state.index].key;
        }
        return(
            <div>
                <div className="top">
                  <a className="btn logout-btn" onClick={() => { logOut(false); } }>Logout</a>
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
            </div>
        )
    }
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
    const { navigation, screenProps } = this.props
    // console.log('WALLETSCREEN RENDEr', this.props)
    return (
      <div>
        <MainMenu navigation={navigation} logOut={screenProps.logOut}/>
        <div className="profile-content-area">
          <div className="row user-info">
              <a className="hover-prof" onClick={() => navigation.navigate('ProfileScreen')}>
                  <img src={NoProfile} />
              </a>
              <div className="info">
              <p>John Doe</p>
              <span>Role</span>
              <span>Institution</span>
              </div>
          </div>
        </div>
        <div className="info-content-area">
              <div className="row address">
                <div className="label">Address:</div>
                <div className="value">
                    <CopyToClipboard text="0x255A8eB9aa6811Eb1330B21ddeedE8AB8EeAE62A"
                      onCopy={ () => { screenProps.copied = true; }  }>
                        <span>0x255A8eB9aa6811Eb1330B21ddeedE8AB8EeAE62A</span>
                    </CopyToClipboard>
                </div>
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
        const { navigation, screenProps } = this.props
        // console.log('screenProps in ProfileScreen', screenProps)
        const hasAccount = screenProps.hasAccount;
        return (
            <div className="profile">
                <MainMenu navigation={navigation} logOut={screenProps.logOut}/>
                <div className={!hasAccount ? "overlay" : "hidden" } onClick={() => {screenProps.createAccount();}}>
                    <a className="btn">Create Profile</a>
                </div>
                <div className="profile-content-area">
                    <div className="row user-info">
                        <a className="hover-text">
                            <img src={NoProfile} />
                        </a>
                        <div className="info">
                        <p>John Doe</p>
                        <span>Role</span>
                        <span>Institution</span>
                        </div>
                        </div>
                        <div className="row counters">
                            <p><span className="number">10</span>Datasets</p>
                            <p><span className="number">100</span>Followers</p>
                            <p><span className="number">100</span>Following</p>
                        </div>
                        <div className="row">
                        <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam iaculis hendrerit. Vivamus id purus dolor. Duis lacinia ultrices neque, ac laoreet leo maximus ut. Praesent sapien nisl, finibus quis urna et, faucibus rutrum diam.</p>
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
        const { navigation, screenProps } = this.props
        return (
            <div>
                <MainMenu navigation={navigation} logOut={screenProps.logOut}/>
                <div className="row">
                    <Tool name={"Faucet"} onClick={() => { console.log('pin'); }} />
                    <Tool name={"Uniswap"} onClick={() => { console.log('pin'); }} />
                    <Tool name={"Airswap Instant"} onClick={() => { console.log('pin'); }} />
                    <Tool name={"Publish Dataset"} onClick={() => { console.log('pin'); }} />
                    <Tool name={"Bridge"} onClick={() => { console.log('pin'); }} />
                    <Tool name={"Settings"} onClick={() => { console.log('pin'); }} />
                </div>
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
            <AppContainer screenProps={{ hasAccount: this.state.hasAccount, logOut: onLogOut, createAccount: this.createAccount, copied: false }}/>
        );
    };
}

// const AppContainer = createAppContainer(WalletNavigator);

export default Wallet;
