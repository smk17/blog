// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { errorToJSON } from "utils";
import { Blog } from "utils/db";
import pick from "lodash/pick";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.slug as string;
    const order = ["id", "title", "content"];
    const blog = await Blog.findOne({ where: { id }, order });
    if (!blog) {
      res.status(404).json({ msg: "Blog 不存在" });
      return;
    }
    if (req.method === "GET") {
      res.status(200).json(pick(blog, order));
      return;
    }
    if (req.method === "POST") {
      const { title, content } = req.body;

      await blog.update({ title, content });
      res.status(200).json({ id: blog.id });
      return;
    }

    res.status(404).json({ msg: "没有该接口" });
    return;
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
