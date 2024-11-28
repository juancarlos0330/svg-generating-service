import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getChainEnum from "@/utils/api/getChainEnum";

// pages/api/createEntry.js

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Parse incoming data from request body
      const { walletAddress, chainName } = req.body;
      // Create user entry
      const user = await prisma.user.create({
        data: {
          walletAddress: walletAddress,
          chain: { connect: { name: getChainEnum(chainName) } }
        }
      });

      // // Create user entry
      // const user = await prisma.user.create({
      //   data: {
      //     walletAddress: "dummy_wallet_address2",
      //     chain: { connect: { name: Chain.BASE } }
      //   }
      // });

      res.status(201).json({ message: "Entry created successfully", data: { user } });
    } catch (error) {
      console.error("Error creating entry:", error);
      res.status(500).json({ error: "Could not create entry" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
