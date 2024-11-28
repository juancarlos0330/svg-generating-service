import { useReadContract } from "wagmi";
import { giftCardAbi } from "../giftCardAbi";
import { useAccount } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";

export const useCreditsLookup = () => {
  const { address } = useAccount();
  const { giftCardAddress } = useContractAddressByChain();

  const { data: userCredits, queryKey: creditsQuery } = useReadContract({
    abi: giftCardAbi,
    address: giftCardAddress as `0x${string}`,
    functionName: "getUserCredits",
    args: [address]
  });

  return { userCredits, creditsQuery };
};
