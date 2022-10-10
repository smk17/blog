// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { errorToJSON } from "utils";
import { updateBlog } from "collections/Blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id as string;

    if (req.method === "POST") {
      const { slug, title, content } = req.body;

      await updateBlog(id, { slug, title, content });
      res.status(200).json({ id });
      return;
    }

    res.status(404).json({ msg: "没有该接口" });
    return;
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
