import { polyAbi } from "../polyAbi";
import { useUserLookup } from "./useUserLookup";
import { useGetDomainTLD } from "./useGetDomainTLD";
import { useReadContract } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { useAccount } from "wagmi";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useGetPrimaryDomain = () => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { userDomains } = useUserLookup();
  const TLD = useGetDomainTLD();
  const primaryDomainId = (userDomains as { primaryDomain: bigint })?.primaryDomain;

  const { data: domainInfo } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "registryLookupById",
    args: [primaryDomainId]
  });

  const primaryDomain = `${(domainInfo as { domainName: string })?.domainName}.${TLD}`;

  return primaryDomain as string;
};
