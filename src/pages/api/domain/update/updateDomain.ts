import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getCategoryEnum from "@/utils/api/getCategoryEnum";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const {
        id,
        mainImgUrl,
        bannerURL,
        domainName,
        location,
        bio,
        name,
        chain,
        walletAddress,
        category,
        website,
        discord,
        youtube,
        twitter,
        telegram,
        instagram,
        linkedin
      } = req.body;

      // Find the domain to be updated
      const domain = await prisma.domain.findFirst({
        where: {
          id // Specify the condition to search by domainName
        },
        include: {
          User: {
            where: {
              walletAddress,
              chain: {
                name: getChainEnum(chain)
              }
            }
          }
        }
      });

      console.log("Domain from API:", domain);
      if (!domain) {
        return res.status(404).json({ error: "Domain not found" });
      }

      // Create an object with only provided values
      const dataToUpdate: any = {
        mainImgUrl,
        bannerURL,
        location,
        bio,
        name,
        category,
        website,
        discord,
        youtube,
        twitter,
        telegram,
        instagram,
        linkedin
      };

      // Remove keys with undefined or null values
      Object.keys(dataToUpdate).forEach(
        (key) => dataToUpdate[key] === undefined || (dataToUpdate[key] === null && delete dataToUpdate[key])
      );

      if (dataToUpdate.category) {
        dataToUpdate.category = getCategoryEnum(dataToUpdate.category);
      }

      console.log("trying to update second", domain.id);
      // Update the domain in the database
      const updatedDomain = await prisma.domain.update({
        where: {
          id: domain.id
        },
        data: dataToUpdate
      });

      res.status(200).json({ message: "Domain updated successfully", data: updatedDomain });
    } catch (error) {
      console.error("Error updating domain:", error);
      res.status(500).json({ error: "Could not update domain" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
