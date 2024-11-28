import { useReadContract, useAccount, useBalance } from "wagmi";
import { polyAbi } from "../polyAbi";
import { formatEther } from "viem";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const usePriceToRenew = (len: number) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { data: renewPrice1 } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "priceToRenew",
    args: [len]
  });
  let renewPriceInEther;
  if (renewPrice1) {
    renewPriceInEther = formatEther(renewPrice1 as bigint);
  }
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  const symbol = data?.symbol;
  return { renewPriceInEther, renewPrice1, symbol };
};
