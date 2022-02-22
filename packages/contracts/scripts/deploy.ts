import * as fs from 'fs';
import { ethers, network, run } from 'hardhat';

const networkName: { [chain: number]: string } = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Testnet',
};

const networkCurrency: { [chain: number]: string } = {
  1: 'ETH',
  4: 'ETH',
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  if (!deployer.provider) {
    console.error('Provider not found for network');
    return;
  }
  const { chainId } = await deployer.provider.getNetwork();
  console.log('Deploying MetaChievs on network:', networkName[chainId]);
  console.log('Account address:', address);
  console.log(
    'Account balance:',
    ethers.utils.formatEther(await deployer.provider.getBalance(address)),
    networkCurrency[chainId],
  );

  const MetaChievs = await ethers.getContractFactory('MetaChievs');
  const metaChievs = await MetaChievs.deploy();
  await metaChievs.deployed();

  const txHash = metaChievs.deployTransaction.hash;
  const receipt = await deployer.provider.getTransactionReceipt(txHash);
  console.log('Block Number:', receipt.blockNumber);

  const deploymentInfo = {
    network: network.name,
    contract: metaChievs.address,
    txHash,
    blockNumber: receipt.blockNumber.toString(),
  };

  fs.writeFileSync(
    `deployments/${network.name}.json`,
    JSON.stringify(deploymentInfo, undefined, 2),
  );

  try {
    console.log('Verifying Contracts...');
    metaChievs.deployTransaction.wait(5);
    const TASK_VERIFY = 'verify:verify';

    await run(TASK_VERIFY, {
      address: metaChievs.address,
      constructorArguments: [],
    });
    console.log('Verified Contract');
  } catch (err) {
    console.error('Error verifying contracts:', err);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
