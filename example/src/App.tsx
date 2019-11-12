import * as React from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import OPWidget from 'op-web3-wallet'
// @ts-ignore
// import WalletConnectProvider from '@walletconnect/web3-provider'
// import Portis from '@portis/web3'
// @ts-ignore
// import Squarelink from 'squarelink'
// import Torus from '@toruslabs/torus-embed'
// @ts-ignore
// import Fortmatic from 'fortmatic'
// import { convertUtf8ToHex } from '@walletconnect/utils'
import Button from './components/Button'
import Column from './components/Column'
import Wrapper from './components/Wrapper'
// import Modal from './components/Modal'
import Header from './components/Header'
// import Loader from './components/Loader'
// import AccountAssets from './components/AccountAssets'
// import { apiGetAccountAssets } from './helpers/api'
// import {
//   hashPersonalMessage,
//   recoverPublicKey,
//   recoverPersonalSignature,
//   formatTestTransaction
// } from './helpers/utilities'
import { IAssetData } from './helpers/types'
// import { fonts } from './styles'
// import asset from './assets/asset'

import { opOptions } from './config'

const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`

const SLanding = styled(Column)`
  height: 0px;
`

// const STestButtonContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
// `

// const STestButton = styled(Button)`
//   border-radius: 8px;
//   font-size: ${fonts.size.medium};
//   height: 44px;
//   width: 100%;
//   max-width: 175px;
//   margin: 12px;
// `

interface IAppState {
  fetching: boolean
  address: string
  web3: any
  connected: boolean
  chainId: number
  networkId: number
  assets: IAssetData[]
  showModal: boolean
  pendingRequest: boolean
  result: any | null
  ocean: any
  ethBalance: number
  ocnBalance: number
  results: any[]
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: '',
  web3: null,
  connected: false,
  chainId: -1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
  ocean: null,
  ethBalance: 0,
  ocnBalance: 0,
  results: []
}

class App extends React.Component<any, any> {
  public state: IAppState = {
    ...INITIAL_STATE
  }

  public onConnect = async (provider: any) => {
    const web3: any = new Web3(provider)

    const accounts = await web3.eth.getAccounts()

    const address = accounts[0]

    const networkId = await web3.eth.net.getId()

    web3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: web3.utils.hexToNumber
        }
      ]
    })

    const chainId = await web3.eth.chainId()

    await this.setState({
      web3,
      connected: true,
      address,
      chainId,
      networkId
    })
  }

  public toggleModal = () => this.setState({ showModal: !this.state.showModal })

  public resetApp = async () => {
    const { web3 } = this.state
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    this.setState({ ...INITIAL_STATE })
  }

  public render = () => {
    const {
    //   // assets,
      address,
      connected,
      chainId,
      web3,
    } = this.state

    console.log('render', OPWidget)
    console.log('render 2', OPWidget.Button)

    return (
      <SLayout>
        <Column maxWidth={1000} spanHeight>
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            killSession={this.resetApp}
          />
          <SContent>
              <SLanding center>
                <h3>
                  <br /> Widget Example
                </h3>
              </SLanding>

              {!web3 ? (
                <SLanding center>
                  <OPWidget.Button
                    label={"Connect"}
                    oceanOptions={{
                      enabled: false,
                      settings: opOptions
                    }}
                    onWeb3Connected={(provider: any) => {
                      this.onConnect(provider)
                    }}
                    onDisconnect={() => {
                      // empty
                    }}
                    onClose={() => {
                      // empty
                    }}
                    onError={(error: Error) => {
                      console.error(error) // tslint:disable-line
                    }}
                  />
                </SLanding>
              ):(
                <Column center>
                  <div style={{'marginTop': '50px'}}>
                    <span>
                      Widget opened!
                    </span>
                  </div>
                </Column>
              )}
          </SContent>
        </Column>
      </SLayout>

    )
  }
}

export default App
