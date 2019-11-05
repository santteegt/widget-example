import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
const bip39 = require('bip39') // eslint-disable-line @typescript-eslint/no-var-requires

export default class BurnerWalletProvider {

    private web3: Web3
    private namespace: string
    private providerType: string = 'BurnerWallet'

    public constructor(namespace: string) {

        this.web3 = null as any
        this.namespace = namespace
    }

    public async isLogged() {
        if (localStorage.getItem(`${this.namespace}_providerType`) === this.providerType &&
            localStorage.getItem(`${this.namespace}_seedphrase`) !== null && this.web3) {
            return true
        }
        return false
    }

    public async login(httpProviderURL: string) {
        let mnemonic
        // const isLogged = await this.isLogged()

        if (localStorage.getItem(`${this.namespace}_seedphrase`) !== null) {
            mnemonic = localStorage.getItem(`${this.namespace}_seedphrase`)
        } else {
            mnemonic = bip39.generateMnemonic()
            localStorage.setItem(`${this.namespace}_seedphrase`, mnemonic)
        }

        localStorage.setItem(`${this.namespace}_providerType`, this.providerType)
        const provider = new HDWalletProvider(mnemonic, httpProviderURL, 0, 1)
        this.web3 = new Web3(provider as any)
        // const accounts = await this.web3.eth.getAccounts()
        // const balance = await this.web3.eth.getBalance(accounts[0])

        // // fill with Ether if account balance is empty
        // balance === '0' && (await requestFromFaucet(provider.getAddress(0)))
        return this.web3
    }

    public async logout() {
        this.web3 = null as any
        localStorage.removeItem(`${this.namespace}_logType`)
    }

    public getProvider() {
        if (!this.web3) {
            throw new Error('Web3 provider not instantiated')
        }
        return this.web3
    }
}
