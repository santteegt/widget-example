import { Ocean, Logger } from '@oceanprotocol/squid'
import Web3 from 'web3'
import { IOPSettings } from '../helpers/types'

export async function provideOcean(web3Provider: Web3, opts: IOPSettings) {
    const config = {
        web3Provider,
        ...opts
    }
    return await Ocean.getInstance(config)
}

//
// Faucet
//
export interface FaucetResponse {
    success: boolean
    message: string
    trxHash?: string
}

export async function requestFromFaucet(account: string, faucetUri: string) {
    try {
        const url = `${faucetUri}/faucet`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: account,
                agent: 'commons'
            })
        })
        return response.json()
    } catch (error) {
        Logger.error('requestFromFaucet', error.message)
    }
}

export async function airdropOceanTokens(ocean: any, activeAccount: any) {
    // const { ocean } = provider
    await ocean.accounts.requestTokens(activeAccount, 10)
}
