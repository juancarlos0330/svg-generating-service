import { Flex, GradientText } from "@/components";
import React, { useState, useEffect } from "react";
import { giftCardAbi } from "@/utils/web3/giftCardAbi";
import toast from "react-hot-toast";
import { useContractAddressByChain } from "@/utils/web3/hooks/useContractAddressByChain";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useCreditsLookup } from "@/utils/web3/hooks/useCreditsLookup";
import { useGetPriceInUSD } from "@/utils/web3/hooks/useGetPriceInUSD";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import { MainnetChains } from "@/utils/web3/misc/MainnetChains";

const CreditView: React.FC = () => {
  const { giftCardAddress } = useContractAddressByChain();
  const { isConnected, address, chainId } = useAccount();
  const { userCredits } = useCreditsLookup();
  const { priceInUSD } = useGetPriceInUSD();
  const [creditsTransfer, setCreditsTransfer] = useState<number>(0);
  const [creditsBuy, setCreditsBuy] = useState<number>(0);
  const [valueDecimals, setValueDecimals] = useState<number>(1e12);

  const [recipientAddress, setRecipientAddress] = useState<string>("");

  useEffect(() => {
    if (MainnetChains.includes(chainId as number)) {
      setValueDecimals(1e18);
    }
  }, [chainId]);

  const {
    data: creditTransferHash,
    isPending: iscreditPending,
    error: creditError,
    isError: isCreditError,
    writeContract: creditWriteContract
  } = useWriteContract();
  const { isSuccess: isCreditConfirmed, isLoading: isCreditLoading } = useWaitForTransactionReceipt({
    hash: creditTransferHash
  });
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

  const handleTransferAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  const handleCreditTransferCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key === "Backspace") {
        if (input.length === 1) {
          setCreditsTransfer(0);
          return;
        }
      }
    }
    if (!/^\d*$/.test(input)) {
      toast.error("Please enter a valid number");
      return;
    }
    setCreditsTransfer(Number(input));
  };

  const handleCreditBuyCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key === "Backspace") {
        if (input.length === 1) {
          setCreditsBuy(0);
          return;
        }
      }
    }
    if (!/^\d*$/.test(input)) {
      toast.error("Please enter a valid number");
      return;
    }
    setCreditsBuy(Number(input));
  };

  useEffect(() => {
    if (isCreditError) {
      console.log("Error : ", creditError);
    }
  }, [isCreditError, creditError]);

  useEffect(() => {
    if (isGiftCardError) {
      console.log("Error : ", giftCardError);
    }
  }, [isGiftCardError, giftCardError]);

  useEffect(() => {
    if (isCreditConfirmed) {
      setCreditsTransfer(0);
      setRecipientAddress("");
      toast.success("Credits Transferred Successfully");
    }
  }, [isCreditConfirmed]);

  useEffect(() => {
    if (isGiftCardConfirmed) {
      toast.success("GiftCard Purchase Successfully");
    }
  }, [isGiftCardConfirmed]);

  const onGiftCardTransfer = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (creditsTransfer === 0) {
      toast.error("Please enter credit amount");
      return;
    }
    if (recipientAddress === "") {
      toast.error("Please enter recipient address");
      return;
    }
    const bigintcreds = BigInt(creditsTransfer * valueDecimals * 1e18);
    const FormattedcreditValue = BigInt(bigintcreds / priceInUSD) + BigInt(10);
    creditWriteContract({
      abi: giftCardAbi,
      address: giftCardAddress as `0x${string}`,
      functionName: "mintGiftCard",
      value: FormattedcreditValue,
      args: [recipientAddress]
    });
  };

  const onGiftCardBuy = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    const bigintcreds = BigInt(creditsBuy * valueDecimals * 1e18);
    const FormattedcreditValue = BigInt(bigintcreds / priceInUSD) + BigInt(10);
    giftCardWriteContract({
      abi: giftCardAbi,
      address: giftCardAddress as `0x${string}`,
      functionName: "mintGiftCard",
      value: FormattedcreditValue,
      args: [address]
    });
  };
  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3">
        <GradientText>credits</GradientText>
      </div>
      <Flex direction="flex-col" className="pt-5 space-y-4 w-[578px]  laptop:w-full">
        <Flex direction="flex-col" className="w-full space-y-[10px] pt-3">
          <p className="text-[16px] font-500 text-main-900 ">Buy Gift Card </p>
          <Flex className="space-x-5 small:flex-col small:space-x-0 small:space-y-5">
            <Flex className="flex-1 w-full space-x-5 small:flex-col small:space-x-0 small:space-y-2">
              <input
                onChange={handleCreditBuyCount}
                value={creditsBuy === 0 ? "" : creditsBuy}
                placeholder="Enter amount to buy"
                className="flex-1  placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
              />
            </Flex>
            {isGiftCardPending || (isGiftCardLoading && giftCardHash) ? (
              <div className="flex justify-center w-[151px] laptop:w-[100px] laptop:px-0 small:w-full px-[38px] py-[11px]">
                <TransactionLoading size={30} color={"#CAFC01"} />
              </div>
            ) : (
              <button
                onClick={onGiftCardBuy}
                className="w-[151px] laptop:w-[100px] laptop:px-0 small:w-full bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black"
              >
                Buy
              </button>
            )}
          </Flex>
        </Flex>

        <Flex direction="flex-col" className="w-full space-y-[10px] pt-3">
          <p className="text-[16px] font-500 text-main-900 ">Send Gift Card </p>
          <Flex className="space-x-5 small:flex-col small:space-x-0 small:space-y-5">
            <Flex className="flex-1 w-full space-x-5 small:flex-col small:space-x-0 small:space-y-2">
              <div className="relative">
                <input
                  onChange={handleCreditTransferCount}
                  value={creditsTransfer === 0 ? "" : creditsTransfer}
                  placeholder="Enter amount to send"
                  className="flex-1  placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
                />
              </div>

              <input
                value={recipientAddress}
                onChange={handleTransferAddress}
                placeholder="Enter address to send creditsTransfer "
                className="flex-1  placeholder:text-[14px] w-full h-[54px] small:py-3 rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
              />
            </Flex>
            {iscreditPending || (isCreditLoading && creditTransferHash) ? (
              <div className="flex justify-center w-[151px] laptop:w-[100px] laptop:px-0 small:w-full px-[38px] py-[11px]">
                <TransactionLoading size={30} color={"#FFCE00"} />
              </div>
            ) : (
              <button
                onClick={onGiftCardTransfer}
                className="w-[151px] laptop:w-[100px] laptop:px-0 small:w-full bg-warning text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black"
              >
                Transfer
              </button>
            )}
          </Flex>
        </Flex>

        <Flex align="items-center" className="pt-10 space-x-5">
          <p className="text-[16px] font-500 text-main-900">Available Credits</p>
          <p className="text-[10px] rounded-full  text-black py-1 px-2 font-500 bg-[#65C8DE]">
            {isConnected ? Math.floor(Number(userCredits) / valueDecimals) : 0} Credits
          </p>
        </Flex>
      </Flex>
    </div>
  );
};

export default CreditView;
