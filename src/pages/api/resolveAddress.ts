import { getChainDetailsByTLD } from "@/utils/api/web3/getChainDetailsByTLD";
import { NextApiRequest, NextApiResponse } from "next";
import { mnetAbi } from "@/utils/web3/mnetAbi";
import { createPublicClient, http } from "viem";

// Cache for chain details
const chainDetailsCache = new Map();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { tld, address } = req.query;

      if (!tld || !address) {
        res.status(400).json({ code: 400, message: "Invalid Details" });
        return;
      }

      let chainDetails = chainDetailsCache.get(tld as string);

      if (!chainDetails) {
        chainDetails = getChainDetailsByTLD(tld as string);
        chainDetailsCache.set(tld as string, chainDetails);
      }

      const registryAddress = chainDetails.registryAddress;
      const chain = chainDetails.chain;

      if (!registryAddress || !chain) {
        res.status(404).json({ code: 400, message: "Invalid Chain" });
        return;
      }

      const registryContract = {
        address: registryAddress as `0x${string}`,
        abi: mnetAbi
      } as const;

      const publicClient = createPublicClient({
        chain: chain,
        transport: http()
      });

      const userDetailsPromise = publicClient.readContract({
        ...registryContract,
        functionName: "userLookupByAddress",
        args: [address as string]
      });

      const [userDetails] = await Promise.all([userDetailsPromise]);

      const primaryDomainCallPromise = publicClient.readContract({
        ...registryContract,
        functionName: "registryLookupById",
        args: [(userDetails as any).primaryDomain]
      });

      const userDetailsTyped = userDetails as { allOwnedDomains: string[] };

      const userOwnedDomainsPromise = Promise.all(
        userDetailsTyped.allOwnedDomains.map(async (domainId: string) => {
          const domainCall = publicClient.readContract({
            ...registryContract,
            functionName: "registryLookupById",
            args: [domainId]
          });
          return domainCall;
        })
      );

      const [primaryDomainCall, userOwnedDomains]: any = await Promise.all([
        primaryDomainCallPromise,
        userOwnedDomainsPromise
      ]);

      const primaryDomain = `${primaryDomainCall.domainName}.${tld}`;

      const userOwnedDomainNames = userOwnedDomains.map((domainCall: any) => `${domainCall.domainName}.${tld}`);

      res.status(200).json({ code: 200, primaryDomain, userOwnedDomains: userOwnedDomainNames });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
