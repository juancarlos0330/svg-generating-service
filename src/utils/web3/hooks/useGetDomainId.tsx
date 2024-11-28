import { polyAbi } from "../polyAbi";
import { useReadContract } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { useAccount } from "wagmi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useGetDomainId = (domainName: string) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { data: domainId } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "domainLookup",
    args: [domainName]
  });
  return { domainId };
};
