import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Parse incoming data from request body
      const { domainNames, userID } = req.body;

      // const userID = 6;
      // const domainNames = [
      //   "devtest123qwertyddd121",
      //   "devtest123qwerty132",
      //   "devtest23qwerty1233",
      //   "devtest13qwerty1234",
      //   "devtest1d23"
      // ];

      console.log("domainNames", domainNames);
      // Ensure domainNames is an array
      if (!Array.isArray(domainNames)) {
        return res.status(400).json({ error: "domainNames should be an array of strings" });
      }

      // Create an array of promises to create domain entries in parallel
      const createDomainPromises = domainNames.map(async (domainName) => {
        const domain = await prisma.domain.create({
          data: {
            domainName: domainName,
            User: { connect: { id: userID } }
          }
        });
        return domain;
      });

      // Execute all promises in parallel
      const createdDomains = await Promise.all(createDomainPromises);

      res.status(201).json({ message: "Entries created successfully", data: { domains: createdDomains } });
    } catch (error) {
      console.error("Error creating entries:", error);
      res.status(500).json({ error: "Could not create entries" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

//   //   Create domain entry
//   const domain = await prisma.domain.create({
//     data: {
//       domainName: "devtest123qwerty1231",
//       User: { connect: { id: 9 } }
//     }
//   });
