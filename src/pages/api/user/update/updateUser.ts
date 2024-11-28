import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const {
        id,
        walletAddress,
        chain,
        email,
        verified,
        referralCode,
        followers100Badge,
        followers500Badge,
        followers1000Badge,
        followers10000Badge,
        domain100DaysBadge,
        domain200DaysBadge,
        domain365DaysBadge,
        domain500DaysBadge,
        domainL1Badge,
        domainL2Badge,
        domainL3Badge,
        domainL4Badge,
        domain2Badge,
        domain5Badge,
        domain20Badge,
        domain100Badge
      } = req.body;

      // Find the user to be updated
      const user = await prisma.user.findFirst({
        where: {
          id // Specify the condition to search by id
        }
      });

      // console.log("User from API:", user);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create an object with only provided values
      const dataToUpdate: any = {
        walletAddress,
        email,
        verified,
        // referralCode,
        followers100Badge,
        followers500Badge,
        followers1000Badge,
        followers10000Badge,
        domain100DaysBadge,
        domain200DaysBadge,
        domain365DaysBadge,
        domain500DaysBadge,
        domainL1Badge,
        domainL2Badge,
        domainL3Badge,
        domainL4Badge,
        domain2Badge,
        domain5Badge,
        domain20Badge,
        domain100Badge
      };

      // Remove keys with undefined or null values
      Object.keys(dataToUpdate).forEach(
        (key) => dataToUpdate[key] === undefined || (dataToUpdate[key] === null && delete dataToUpdate[key])
      );

      // console.log("trying to update user", user.id);
      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: dataToUpdate
      });

      res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Could not update user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
