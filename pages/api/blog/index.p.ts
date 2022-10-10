// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { errorToJSON } from "utils";
import { createBlog, findBlogAndCount } from "collections/Blog";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const current = +(req.query.current || 1) - 1;
      const pageSize = +(req.query.pageSize || 10);
      const ret = await findBlogAndCount({ current, pageSize });
      res.status(200).json(ret);
      return;
    }
    if (req.method === "PUT") {
      const { slug, title, content } = req.body;
      const blog = await createBlog({ slug, title, content });
      res.status(200).json({ id: blog.id });
      return;
    }

    res.status(404).json({ msg: "没有该接口" });
    return;
  } catch (error) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
