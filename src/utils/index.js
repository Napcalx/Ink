import { ethers, toBigInt } from "ethers";
import { rpcUrlsMap, supportedChain } from "../constants";
import {
    inkContractAddress,
    multcall2ContractAddress,
} from "../constants/addresses";
import inkAbi from "../constants/abis/ink.json";
import multicall2Abi from "../constants/abis/multicall2Abi.json";

export const isSupportedChain = (chainId) =>
    supportedChain.includes(Number(chainId));

export const shortenAccount = (account) =>
    `${account.substring(0, 6)}...${account.substring(38)}`;

export const getReadOnlyProvider = (chainId) => {
    return new ethers.JsonRpcProvider(rpcUrlsMap[chainId]);
};

export const getContract = async (address, abi, provider, withWrite) => {
    let signer;
    if (withWrite) signer = await provider.getSigner();

    return new ethers.Contract(address, abi, withWrite ? signer : provider);
};

const getInterface = (abi) => new ethers.Interface(abi);
export const getInkInterface = () => getInterface(inkAbi);

export const getContractWithProvider = (address, abi, provider) => {
    return new ethers.Contract(address, abi, provider);
};

export const getInkContract = async (provider, withWrite) => {
    return await getContract(
        inkContractAddress,
        inkAbi,
        provider,
        withWrite
    );
};

export const getInkContractWithProvider = (provider) => {
    return getContractWithProvider(
        inkContractAddress,
        inkAbi,
        provider
    );
};

export const getMulticall2ContractWithProvider = (provider) => {
    return getContractWithProvider(
        multcall2ContractAddress,
        multicall2Abi,
        provider
    );
};

export const calculateGasMargin = (value) =>
    (toBigInt(value) * toBigInt(120)) / toBigInt(100);
