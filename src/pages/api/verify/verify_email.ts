import type { NextApiRequest, NextApiResponse } from "next";
import { getAccount } from "@wagmi/core";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, reason, wallet } = req.body;

      const apiUrl = "https://zns-be-production.up.railway.app/verify/email";
      const requestData = {
        email: email,
        reason: reason,
        wallet: wallet
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
      res.status(200).json(data);
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
