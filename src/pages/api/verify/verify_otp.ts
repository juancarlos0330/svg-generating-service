import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, reason, wallet, id, chain, otp } = req.body;

      const apiUrl = "https://zns-be-production.up.railway.app/verify/email";
      const requestData = {
        email: email,
        reason: reason,
        wallet: wallet,
        id: id,
        otp: otp
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const data = await response.json();
      console.log("BE data", data);

      console.log(data, otp, data.otp === otp);
      if (data.data.otp === otp) {
        const user = await prisma.user.findFirst({
          where: {
            walletAddress: wallet,
            chain: {
              name: getChainEnum(chain)
            }
          },
          include: {
            chain: true
          }
        });

        console.log("user", user);

        const updatedUser = await prisma.user.update({
          where: { id: user?.id },
          data: {
            email: email,
            verified: true
          }
        });
        console.log("updated", updatedUser);

        res.status(200).json(data);
      } else {
        res.status(200).json("Wrong_otp");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
