import { publicClient } from "./client";
import { mnetAbi } from "../mnetAbi";

const contractAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MINT;

export async function fetchDomainDetails(domainName: string) {
  const data = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: mnetAbi,
    functionName: "registryLookupByName",
    args: [domainName]
  });
  return data;
}
