import { PrismaClient, Domain } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import getChainEnum from "@/utils/api/getChainEnum";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { followerId, followingId, followingDomain, followerWalletAddress, followerChain } = req.body;
    // const followerId = 11;
    // const followingId = 6;

    try {
      let followerExists;
      let followingExists;
      if (followerId && followingId) {
        console.log("followerId and followingId", followerId, followingId);
        // Ensure both followerId and followingId are provided
        followerExists = (await prisma.domain.findUnique({
          where: { id: followerId }
        })) as Domain; // Explicitly cast to your Domain type

        followingExists = (await prisma.domain.findUnique({
          where: { id: followingId }
        })) as Domain; // Explicitly cast to your Domain type
      } else if (followerWalletAddress && followerChain && followingDomain) {
        followerExists = await prisma.domain.findFirst({
          where: {
            domainName: followingDomain // Specify the condition to search by domainName
          },
          include: {
            User: {
              where: {
                walletAddress: followerWalletAddress,
                chain: {
                  name: getChainEnum(followerChain)
                }
              }
            }
          }
        });

        console.log(followerExists);

        followingExists = (await prisma.domain.findUnique({
          where: { id: followingId }
        })) as Domain; // Explicitly cast to your Domain type
      } else {
        console.log(followerExists, followingExists, "followerExists and followingExists");
        res.status(400).json({ error: "Not found" });
      }

      if (!followerExists || !followingExists) {
        return res.status(404).json({ error: "One or both of the domains do not exist" });
      }

      // if (followerExists.followingIds.length > 0 && followerExists.followingIds.length > 0) {
      // Check if followerId already exists in followingIds array
      if (!followerExists.followingIds.includes(followingId) && !followingExists.followerIds.includes(followerId)) {
        await prisma.$transaction([
          // Update follower list
          prisma.domain.update({
            where: { id: followingExists?.id },
            data: {
              followerIds: {
                push: followerExists?.id
              }
            }
          }),

          prisma.domain.update({
            where: { id: followerExists?.id },
            data: {
              followingIds: {
                push: followingExists?.id
              }
            }
          })
        ]);
      }
      res.status(200).json({ message: "Followed successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
