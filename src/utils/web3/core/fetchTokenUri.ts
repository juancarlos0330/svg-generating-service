import { config } from "./config";
import { mnetAbi } from "../mnetAbi";
import { readContract } from "@wagmi/core";
export async function fetchTokenUri(domainName: string): Promise<any> {
  const contractAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MINT;

  const domainId = await readContract(config, {
    abi: mnetAbi,
    address: contractAddress as `0x${string}`,
    functionName: "domainLookup",
    args: [domainName]
  });
  const domainUri = await readContract(config, {
    abi: mnetAbi,
    address: contractAddress as `0x${string}`,
    functionName: "tokenURI",
    args: [domainId]
  });
  return domainUri;
}
