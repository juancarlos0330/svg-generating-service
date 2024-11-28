import { useReadContract, useAccount, useBalance } from "wagmi";
import { polyAbi } from "../polyAbi";
import { formatEther } from "viem";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const usePriceToRegister = (len: number) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();
  const { data: priceBigint } = useReadContract({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "priceToRegister",
    args: [len]
  });
  let priceInEther;
  if (priceBigint !== undefined) {
    if (priceBigint === BigInt(0)) {
      priceInEther = "0";
    } else {
      priceInEther = formatEther(priceBigint as bigint);
    }
  }
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  const symbol = data?.symbol;
  return { priceInEther, priceBigint, symbol };
};
