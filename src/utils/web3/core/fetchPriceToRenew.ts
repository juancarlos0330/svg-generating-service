import { publicClient } from "./client";
import { formatEther } from "viem";
import { mnetAbi } from "../mnetAbi";

const contractAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MINT;

export async function fetchPriceToRenew(len: number) {
  const data = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: mnetAbi,
    functionName: "priceToRenew",
    args: [len]
  });
  const NWC_renewPriceInEther = formatEther(data as bigint);
  return { NWC_renewPriceInEther, symbol: "ETH" };
}
