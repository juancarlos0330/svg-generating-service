import { getChainDetailsByTLD } from "@/utils/api/web3/getChainDetailsByTLD";
import { NextApiRequest, NextApiResponse } from "next";
import { mnetAbi } from "@/utils/web3/mnetAbi";
import { createPublicClient, http } from "viem";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { tld, domain } = req.query;

      if (!tld || !domain) {
        res.status(400).json({ code: 400, message: "Invalid Details" });
        return;
      }

      const chainDetails = getChainDetailsByTLD(tld as string);

      const registryAddress = chainDetails.registryAddress;
      const chain = chainDetails.chain;
      if (!registryAddress || !chain) {
        res.status(404).json({ code: 400, message: "Invalid Chain" });
      }

      const publicClient = createPublicClient({
        chain: chain,
        transport: http()
      });

      const data: any = await publicClient.readContract({
        address: registryAddress as `0x${string}`,
        abi: mnetAbi,
        functionName: "registryLookupByName",
        args: [domain as string]
      });

      if (data.owner === "0x0000000000000000000000000000000000000000") {
        res.status(404).json({ code: 400, message: "Domain not found" });
        return;
      }

      res.status(200).json({ code: 200, address: data?.owner });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
