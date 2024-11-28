import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      // Parse incoming data from request body
      const { chainName, walletAddress } = req.body;

      // Find the user to delete based on wallet address and chainId
      const user = await prisma.user.findFirst({
        where: {
          walletAddress: walletAddress,
          chain: {
            name: getChainEnum(chainName)
          }
        }
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Delete the user
      await prisma.user.delete({
        where: {
          id: user.id
        }
      });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Could not delete user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
