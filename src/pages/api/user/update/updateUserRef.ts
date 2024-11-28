import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

// List of unchangeable referral codes
const unchangeableReferrals = ["Layer3"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const { id, referralCode } = req.body;
      // Check if the referral code is unchangeable
      if (unchangeableReferrals.includes(referralCode)) {
        return res.status(400).json({ error: "Referral code is unchangeable" });
      } else {
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
          referralCode
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
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Could not update user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
