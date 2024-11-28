import { useReadContract, useAccount } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { newAbiChainIds } from "../misc/newAbiChainIds";
import { polyAbi } from "../polyAbi";
import { mnetAbi } from "../mnetAbi";

export const useGetPriceInUSD = () => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { data: priceInUSD } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "getOraclePrice"
  });
  return { priceInUSD: priceInUSD as bigint };
};
