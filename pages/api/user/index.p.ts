// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser } from "collections/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { name, email, avatar } = req.body;
    const blog = await createUser({ name, email, avatar });
    res.status(200).json(JSON.parse(JSON.stringify(blog)));
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
