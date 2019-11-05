import React from 'react';

export const Widget = React.createContext({
	isLoggedIn: false,
    isLoading: false,
    account: '',
    web3: {},
    ocean: {},
    box: {},
    balance: {
        eth: 0,
        ocn: 0
    },
    network: '',
    openWalletProvider: () => {
        /* empty */
    },
    requestFromFaucet: () => {
        /* empty */
    },
    airdropOceanTokens: () => {
        /* empty */
    },
    loginWallet: () => {
        /* empty */
    },
    loginBurnerWallet: () => {
        /* empty */
    },
    message: ''

})