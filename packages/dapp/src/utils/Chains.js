const INFURA_ID = process.env.INFURA_ID;

export const supportedChains = {
    1: {
        name: "Ethereum Mainnet",
        short_name: "eth",
        chain: "ETH",
        network: "mainnet",
        chain_id: 1,
        network_id: 1,
        rpc_url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
        graph_url: "",
    },
    4: {
        name: "Ethereum Rinkeby",
        short_name: "rin",
        chain: "ETH",
        network: "rinkeby",
        chain_id: 4,
        network_id: 4,
        rpc_url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
        graph_url: "",
    },
    42: {
        name: "Ethereum Kovan",
        short_name: "kov",
        chain: "ETH",
        network: "kovan",
        chain_id: 42,
        network_id: 42,
        rpc_url: `https://kovan.infura.io/v3/${INFURA_ID}`,
        graph_url: "",
    },
    100: {
        name: "xDAI Chain",
        short_name: "xdai",
        chain: "xDAI",
        network: "xDai",
        chain_id: 100,
        network_id: 1,
        rpc_url: "https://dai.poa.network",
        graph_url: "",
        api_url: "https://api.airtable.com/v0/appCMXlJb1YXufI5h",
        read_only_key: "keyNBF8pFE8fxR3I3",
    },
};

export function getChainData(chainId) {
    const chainData = supportedChains[+chainId];

    if (!chainData) {
        throw new Error("ChainId missing or not supported");
    }

    return chainData;
}

export default supportedChains;
