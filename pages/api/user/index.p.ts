// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUser } from "collections/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { name, email, avatar } = req.body;
    const user = await createUser({ name, email, avatar });
    res.status(200).json({ id: user.id });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
