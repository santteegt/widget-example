export const opOptions = {
  nodeUri: process.env.REACT_APP_NODE_URI || 'https://pacific.oceanprotocol.com',
  aquariusUri: process.env.REACT_APP_AQUARIUS_URI || 'https://aquarius.commons.oceanprotocol.com',
  brizoUri: process.env.REACT_APP_BRIZO_URI || 'https://brizo.commons.oceanprotocol.com',
  brizoAddress: process.env.REACT_APP_BRIZO_ADDRESS || '0x008c25ed3594e094db4592f4115d5fa74c4f41ea',
  secretStoreUri: process.env.REACT_APP_SECRET_STORE_URI || 'https://secret-store.oceanprotocol.com',
  verbose: true
}

export const faucetURI = process.env.REACT_APP_FAUCET_URI || 'https://faucet.oceanprotocol.com'