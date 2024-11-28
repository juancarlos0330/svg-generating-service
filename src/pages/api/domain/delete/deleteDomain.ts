import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { domainName, walletAddress, chain } = req.body;

      // Find the domain to be deleted
      const domain = await prisma.domain.findFirst({
        where: {
          domainName,
          User: {
            walletAddress,
            chain: {
              name: getChainEnum(chain)
            }
          }
        }
      });

      if (!domain) {
        return res.status(404).json({ error: "Domain not found" });
      }

      // Delete the domain from the database
      await prisma.domain.delete({
        where: {
          id: domain.id
        }
      });

      res.status(200).json({ message: "Domain deleted successfully" });
    } catch (error) {
      console.error("Error deleting domain:", error);
      res.status(500).json({ error: "Could not delete domain" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
