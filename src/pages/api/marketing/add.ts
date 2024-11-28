// pages/api/subscribe.js
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const dc = process.env.MAILCHIMP_SERVER_PREFIX;
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;

    // Constructing the URL
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members?skip_merge_validation=${true}`;

    // Constructing the request headers
    const headers = {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json"
    };

    // Constructing the request body
    const data = JSON.stringify({
      email_address: email,
      status: "subscribed"
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: data
      });

      await response.json();
      //   res.status(response.status).json({responseData});
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
