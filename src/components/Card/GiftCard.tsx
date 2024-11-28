import { CardProps } from "@/types/card";
import { Flex, Image } from "..";
import React, { useEffect } from "react";
import { giftCardAbi } from "@/utils/web3/giftCardAbi";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import toast from "react-hot-toast";
import { useGiftCardLookup } from "@/utils/web3/hooks/useGiftCardLookup";
import { useCreditsLookup } from "@/utils/web3/hooks/useCreditsLookup";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import { useQueryClient } from "@tanstack/react-query";
import { useContractAddressByChain } from "@/utils/web3/hooks/useContractAddressByChain";

const GiftCard: React.FC<CardProps> = ({ count, name, src }) => {
  const { giftCardAddress } = useContractAddressByChain();
  const queryClient = useQueryClient();
  const { creditsQuery } = useCreditsLookup();
  const { giftCardQuery } = useGiftCardLookup();
  const { isConnected } = useAccount();

  const {
    data: giftCardHash,
    isPending: isGiftCardPending,
    error: giftCardError,
    isError: isGiftCardError,
    writeContract: giftCardWriteContract
  } = useWriteContract();
  const { isSuccess: isGiftCardConfirmed, isLoading: isGiftCardLoading } = useWaitForTransactionReceipt({
    hash: giftCardHash
  });

  useEffect(() => {
    if (isGiftCardConfirmed) {
      queryClient.invalidateQueries({ queryKey: creditsQuery });
      queryClient.invalidateQueries({ queryKey: giftCardQuery });
      toast.success("Gift card redeemed successfully");
    }
  }, [isGiftCardConfirmed]);

  useEffect(() => {
    if (isGiftCardError) {
      console.log("Error : ", giftCardError);
    }
  }, [isGiftCardError, giftCardError]);

  const onGiftCardBurn = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    giftCardWriteContract({
      abi: giftCardAbi,
      address: giftCardAddress as `0x${string}`,
      functionName: "burnGiftCard",
      args: [count]
    });
  };
  return (
    <Flex
      direction="flex-col"
      className="w-full h-[440px] small:w-[314px] mobile:w-[250px] mobile:h-[350px] rounded-xl space-y-5 pb-3 bg-black-200/40 overflow-hidden"
    >
      <Image src={src} alt={name} fill className="w-full h-[250px] shrink-0" />
      <Flex direction="flex-col" className="font-space_grotesk space-y-1 px-[22px] pb-[10px]">
        <p className="text-[24px] font-700 uppercase">{name}</p>
        <p className="text-[14px] text-primary font-700">GiftCard Id: {count.toString()}</p>
      </Flex>
      <Flex className="space-x-5 small:space-x-3 justify-center">
        {isGiftCardPending || (isGiftCardLoading && giftCardHash) ? (
          <div className="flex justify-center w-[151px] laptop:w-[100px] laptop:px-0 px-[38px] py-[11px]">
            <TransactionLoading size={30} color={"#05ABFF"} />
          </div>
        ) : (
          <button
            onClick={onGiftCardBurn}
            className="w-[151px] laptop:w-[100px] laptop:px-0 bg-verified text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black "
          >
            Redeem
          </button>
        )}
      </Flex>
    </Flex>
    // </Flex>
  );
};

export default GiftCard;
