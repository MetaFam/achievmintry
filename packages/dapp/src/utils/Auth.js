import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { getChainData } from './Chains';

export const USER_TYPE = {
    WEB3: 'web3',
    READ_ONLY: 'readonly',
  };

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_RPC.split('/').pop(),
    },
  },
};

export const w3connect = async (web3Connect) => {
  const provider = await web3Connect.w3c.connect();

  const web3 = new Web3(provider);

  const injectedChainId = await web3.eth.getChainId();

  if (+injectedChainId !== +process.env.REACT_APP_NETWORK_ID) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: `Please switch Web3 to the correct network and try signing in again. Detected network: ${
        getChainData(injectedChainId).network
      }, Required network: ${
        getChainData(process.env.REACT_APP_NETWORK_ID).network
      }`,
      error: new Error(
        `Injected web3 chainId: ${injectedChainId}, config: ${process.env.REACT_APP_NETWORK_ID}`,
      ),
    };
  }
  // console.log('w3connect', web3Connect);
  const w3c = web3Connect.w3c;
  return { w3c, web3, provider };
};

export const createWeb3User = (accountAddress) => {
  return {
    type: USER_TYPE.WEB3,
    username: accountAddress,
  };
};

