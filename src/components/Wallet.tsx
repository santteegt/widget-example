import * as React from "react";
import {
  createNavigator,
  SwitchRouter,
  SceneView
} from "@react-navigation/core";
import { createBrowserApp, Link } from "@react-navigation/web";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IWalletProps {
    descriptors: any,
    navigation: any
}

function WalletScreen() {
  return (
    <div>
      <h2>Wallet</h2>
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
          <div
            style={{ position: "relative", width: "100%" }}
          >
            <Link routeName="WalletScreen">Wallet<FontAwesomeIcon icon="wallet" /></Link>
            <Link routeName="ProfileScreen">Profile<FontAwesomeIcon icon="user-circle" /></Link>
            <Link routeName="ToolsScreen">Tools<FontAwesomeIcon icon="tools" /></Link>
          </div>
          <div>
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
