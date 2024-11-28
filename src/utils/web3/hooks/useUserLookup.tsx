import { useReadContract, useAccount } from "wagmi";
import { polyAbi } from "../polyAbi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useUserLookup = () => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { address } = useAccount();
  const { data: userDomains, queryKey: userDomainQuery } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "userLookupByAddress",
    args: [address]
  });

  return { userDomains, userDomainQuery };
};
