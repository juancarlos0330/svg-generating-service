import { useAccount, useReadContract } from "wagmi";
import { mnetAbi } from "../mnetAbi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { newAbiChainIds } from "../misc/newAbiChainIds";

/**
 * Custom hook to get the top-level domain (TLD) for a domain name.
 * It retrieves the TLD from the contract based on the current chainId.
 * If the chainId is 997, it returns "five".
 * If the TLD is available, it returns the TLD.
 * If the TLD is not available but the legacy TLD (TLD) is available, it returns the legacy TLD.
 * If neither the TLD nor the legacy TLD is available, it returns "nft".
 *
 * @returns The top-level domain (TLD) for the domain name.
 */
export const useGetDomainTLD = () => {
  const { chainId } = useAccount();
  const { registryAddress } = useContractAddressByChain();
  const { data: TLD } = useReadContract({
    address: registryAddress as `0x${string}`,
    abi: mnetAbi,
    functionName: "TLD"
  });
  // used tld not TLD in the new BSC contract
  const { data: tld } = useReadContract({
    address: registryAddress as `0x${string}`,
    abi: mnetAbi,
    functionName: "tld"
  });
  if (chainId === 997) {
    return "five";
  }
  if (tld) {
    return tld;
  } else if (TLD) {
    return TLD;
  } else {
    return "nft";
  }
};
