// pages/api/domain/fetch/fetchDomainById.ts

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();
// const allowedDomain = /\.znsconnect\.io$/; // Regular expression for znsconnect.io and its subdomains

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method === "POST") {
    try {
      const { domainId } = req.body;

      //   const domainId = 9;

      const domain = await prisma.domain.findUnique({
        where: { id: domainId }
      });

      res.status(200).json({ message: "Entry retreived successfully", data: { domain } });
    } catch (error) {
      console.error("Error fetching domain:", error);
      res.status(500).json({ error: "Could not fetch domain" });
    }
  } else {
    // Return an error for non-POST requests
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
