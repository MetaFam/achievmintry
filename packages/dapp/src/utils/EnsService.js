import Web3 from "web3";
import { ethers } from "ethers";

const INFURA_ID = process.env.INFURA_ID;

export class EnsService {
  provider;

  constructor() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`),
    );

    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    this.provider = provider;
  }
}
