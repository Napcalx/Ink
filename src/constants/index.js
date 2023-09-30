export const supportedChain = [11155111];

export const networkInfo = {
    11155111: {
        chainId: `0x${(11155111).toString(16)}`,
        chainName: "Sepolia test network",
        rpcUrls: ["https://sepolia.infura.io/v3/"],
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
};

export const defaultReadonlyChainId = 11155111;

export const rpcUrlsMap = {
    11155111: "https://eth-sepolia.g.alchemy.com/v2/Yat-DdazmwLrLHgA1GbhEOVs5YN0U1ij",
};