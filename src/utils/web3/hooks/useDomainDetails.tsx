import { polyAbi } from "../polyAbi";
import { useReadContract } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { useAccount } from "wagmi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useDomainDetails = (domainName: string) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { data: domainData, queryKey: domainQuery } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "registryLookupByName",
    args: [domainName]
  });
  return { domainData, domainQuery };
};
