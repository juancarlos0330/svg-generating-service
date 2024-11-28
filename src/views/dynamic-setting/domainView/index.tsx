import { Flex, GradientText } from "@/components";
import { ascii, gtEq, ltEq } from "@/utils/func";
import React, { useState, useEffect } from "react";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import { useGetDomainId } from "@/utils/web3/hooks/useGetDomainId";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { polyAbi } from "@/utils/web3/polyAbi";
import { mnetAbi } from "@/utils/web3/mnetAbi";
import { useContractAddressByChain } from "@/utils/web3/hooks/useContractAddressByChain";
import { usePriceToRenew } from "@/utils/web3/hooks/usePriceToRenew";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import { useRouter } from "next/router";
import { parseEther } from "viem";
import { newAbiChainIds } from "@/utils/web3/misc/newAbiChainIds";

const DomainView: React.FC<{ domainName: string }> = ({ domainName }) => {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [transferAddress, setTransferAddress] = useState<string>("");
  const [renewPrice, setRenewPrice] = useState<number>(0);
  const { address, isConnected, chainId } = useAccount();
  const { domainId } = useGetDomainId(domainName.split(".")[0]);
  const { renewPrice1 } = usePriceToRenew(domainName.split(".")[0].length);
  const { registryAddress } = useContractAddressByChain();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { data: burnHash, isPending: isburnPending, writeContract: burnWriteContract } = useWriteContract();
  const { isSuccess: isBurnConfirmed, isLoading: isburnLoading } = useWaitForTransactionReceipt({
    hash: burnHash
  });

  const { data: transferHash, isPending: isTransferPending, writeContract: transferWriteContract } = useWriteContract();
  const { isSuccess: isTransferConfirmed, isLoading: isTransferLoading } = useWaitForTransactionReceipt({
    hash: transferHash
  });

  const { data: renewHash, isPending: isRenewPending, writeContract: renewWriteContract } = useWriteContract();
  const { isSuccess: isRenewConfirmed, isLoading: isRenewLoading } = useWaitForTransactionReceipt({
    hash: renewHash
  });

  const handleTransferAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferAddress(e.target.value);
  };

  const handleYearCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (e.nativeEvent instanceof KeyboardEvent) {
      if (e.nativeEvent.key === "Backspace") {
        if (input.length === 1) {
          setCount(0);
          return;
        }
      }
    }
    if (!/^\d*$/.test(input)) {
      toast.error("Please enter a valid number");
      return;
    }
    setCount(Number(input));
  };

  useEffect(() => {
    if (renewPrice1) {
      setRenewPrice(Number(renewPrice1) * count);
    }
  }, [count]);

  useEffect(() => {
    if (isBurnConfirmed || isTransferConfirmed || isRenewConfirmed) {
      router.push("/mydomain");
    }
  }, [isBurnConfirmed, isTransferConfirmed, isRenewConfirmed]);

  const handleCount = (type: boolean) => {
    if (type) {
      if (count < 10) {
        setCount(Number(count) + 1);
      }
    } else {
      if (count > 0) {
        setCount(Number(count) - 1);
      }
    }
  };

  const __checkNumbers = React.useCallback(
    ({ target: { value: v } }: { target: { value: any } }) =>
      v && gtEq(ascii([...v].pop()), 48) && ltEq(ascii([...v].pop()), 57) ? setCount(v) : setCount(v.slice(0, -1)),
    [setCount]
  );

  const onRenew = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    renewWriteContract({
      abi: abi,
      address: registryAddress as `0x${string}`,
      functionName: "renewDomain",
      value: BigInt(renewPrice),
      args: [domainId, count]
    });
  };

  const onTransfer = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!transferAddress.startsWith("0x")) {
      toast.error("Please enter a valid address");
      return;
    }
    transferWriteContract({
      abi: abi,
      address: registryAddress as `0x${string}`,
      functionName: "transferFrom",
      args: [address, transferAddress, domainId]
    });
  };

  const onBurn = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    burnWriteContract({
      abi: abi,
      address: registryAddress as `0x${string}`,
      functionName: "burnDomain",
      args: [domainId]
    });
  };

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3 small:text-center">
        <GradientText>domain</GradientText>
      </div>
      <Flex direction="flex-col" className="pt-5 space-y-4  w-[578px] laptop:w-full">
        <Flex direction="flex-col" className="w-full space-y-[10px] pt-3">
          <p className="text-[16px] font-500 text-main-900 ">Renew your domain with 90% discount</p>
          <Flex className="space-x-5 small:flex-col small:space-x-0 small:space-y-5">
            <Flex className="flex-1 w-full space-x-5">
              <input
                onChange={handleYearCount}
                value={count === 0 ? "" : count}
                placeholder="Enter amount of years"
                className="flex-1  placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
              />

              <Flex className="space-x-3" align="items-center">
                <button onClick={() => handleCount(false)}>
                  <LuMinusCircle className="w-[22px] h-[22px]" />
                </button>
                <input
                  placeholder="1"
                  value={count}
                  onChange={__checkNumbers}
                  className="placeholder:text-[14px] w-[75px] laptop:w-[50px] h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40 text-center"
                />
                <button onClick={() => handleCount(true)}>
                  <LuPlusCircle className="w-[22px] h-[22px]" />
                </button>
              </Flex>
            </Flex>
            {isRenewPending || (isRenewLoading && renewHash) ? (
              <div className="flex justify-center items-center w-[151px] laptop:w-[100px] laptop:px-0">
                <TransactionLoading size={30} color={"#05ABFF"} />
              </div>
            ) : (
              <button
                onClick={onRenew}
                className="w-[151px] laptop:w-[100px] laptop:px-0 small:w-full bg-verified text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black"
              >
                Renew
              </button>
            )}
          </Flex>
        </Flex>

        {/* <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Sell your domain</p>
          <Flex className="space-x-5 small:space-x-3">
            <input
              placeholder="Sell your domain on NFT Marketpalce"
              className="flex-1  placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
            />
            <button className="w-[151px] laptop:w-[100px] laptop:px-0 bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black ">
              Sell
            </button>
          </Flex>
        </Flex> */}

        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Transfer your domain</p>
          <Flex className="space-x-5 small:space-x-3">
            <input
              onChange={handleTransferAddress}
              value={transferAddress}
              placeholder="Enter address to send your domain"
              className="flex-1 placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
            />
            {isTransferPending || (isTransferLoading && transferHash) ? (
              <div className="flex justify-center items-center w-[151px] laptop:w-[100px] laptop:px-0">
                <TransactionLoading size={30} color={"#FFCE00"} />
              </div>
            ) : (
              <button
                onClick={onTransfer}
                className="w-[151px] laptop:w-[100px] laptop:px-0 bg-warning text-[16px] font-500 px-[38px] py-[11px] rounded-xl text-black "
              >
                Transfer
              </button>
            )}
          </Flex>
        </Flex>

        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900">Delete your domain</p>
          <Flex className="space-x-5 small:space-x-3">
            {/* <input
              placeholder="Burn your domain "
              className="flex-1 placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
            /> */}
            {isburnPending || (isburnLoading && burnHash) ? (
              <div className="flex justify-center items-center w-[151px] laptop:w-[100px] laptop:px-0">
                <TransactionLoading size={30} color={"#FF0505"} />
              </div>
            ) : (
              <button
                onClick={onBurn}
                className="w-[151px] laptop:w-[100px] laptop:px-0 bg-danger text-[16px] font-500 px-[38px] py-[11px] rounded-xl"
              >
                Delete
              </button>
            )}
          </Flex>
        </Flex>

        <Flex
          align="items-center"
          className="pt-10 tablet:w-full space-x-10 mobile:flex-col mobile:space-x-0 mobile:space-y-3 mobile:items-start"
        >
          <p className="text-[16px] font-500 text-main-900">Expiration</p>
          <p className="text-[16px] font-700">2025-08-21T18:16:30+02:00</p>
        </Flex>
      </Flex>
      <Toaster />
    </div>
  );
};

export default DomainView;
