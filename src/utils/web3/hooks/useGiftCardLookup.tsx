import { useReadContract, useReadContracts } from "wagmi";
import { giftCardAbi } from "../giftCardAbi";
import { useAccount } from "wagmi";
import { useContractAddressByChain } from "./useContractAddressByChain";

export const useGiftCardLookup = () => {
  const { address } = useAccount();
  const { giftCardAddress } = useContractAddressByChain();

  const { data: userGiftCardId, queryKey: giftCardQuery } = useReadContract({
    abi: giftCardAbi,
    address: giftCardAddress as `0x${string}`,

    functionName: "getUserOwnedGiftCards",
    args: [address]
  });

  //Gift Card Balances Lookup
  const contractCallCredits: any = (userGiftCardId as bigint[])?.map(
    (giftCardId) =>
      ({
        abi: giftCardAbi,
        address: giftCardAddress as `0x${string}`,
        functionName: "giftCardBalances",
        args: [giftCardId]
      }) as const
  );
  const { data: userGiftCardBalances } = useReadContracts({ contracts: contractCallCredits });

  if (userGiftCardId === undefined || userGiftCardBalances === undefined) {
    return { userGiftCards: [] };
  }

  const userGiftCards = (userGiftCardId as bigint[])?.map((giftCardId: bigint, index: number) => ({
    giftCardId,
    credits: userGiftCardBalances[index]?.result
  }));

  return { userGiftCards, giftCardQuery };
};
