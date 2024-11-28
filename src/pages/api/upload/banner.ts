import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { NextApiResponse, NextApiRequest } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { id } = request.query;
  const body = request.body as HandleUploadBody;

  try {
    let updatedDomain;
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () =>
        /* clientPayload */
        {
          // Generate a client token for the browser to upload the file
          // TODO: ⚠️ Authenticate and authorize users before generating the token.
          // Otherwise, you're allowing anonymous uploads.

          return {
            allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            maximumSizeInBytes: 8 * 1024 * 1024 // 8mb
          };
        },
      onUploadCompleted: async ({ blob }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        // console.log("blob upload completed", blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          updatedDomain = await prisma.domain.update({
            where: {
              id: Number(id)
            },
            data: {
              bannerURL: blob.url
            }
          });
          response.status(200).json(updatedDomain);
        } catch (error) {
          throw new Error("Could not update user");
        }
      }
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json({ error: (error as Error).message });
  }
}
