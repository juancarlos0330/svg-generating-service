import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// pages/api/createEntry.js

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Parse incoming data from request body
      const { userID, email } = req.body;
      //   let chain;
      //   switch (chainName) {
      //     case "ZETA":
      //       chain = Chain.ZETA;
      //       break;
      //     case "BERA":
      //       chain = Chain.BERA;
      //       break;
      //     case "X1":
      //       chain = Chain.X1;
      //       break;
      //     case "OPBNB":
      //       chain = Chain.OPBNB;
      //       break;
      //     default:
      //       res.status(500).json({ error: "Invalid Chain" });
      //       break;
      //   }

      // Update User Email
      const updatedUser = await prisma.user.update({
        where: { id: userID },
        data: {
          email: email,
          verified: true
        }
      });

      //   // // Create user entry
      //   const updatedUser = await prisma.user.update({
      //     where: { id: 6 },
      //     data: {
      //       email: "ekansh@gmail.com",
      //       verified: true // If verified is not provided, default it to false
      //     }
      //   });

      res.status(201).json({ message: "Entry created successfully", data: { updatedUser } });
    } catch (error) {
      console.error("Error creating entry:", error);
      res.status(500).json({ error: "Could not create entry" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
