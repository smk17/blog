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
    const order = ["id", "title"];
    if (req.method === "GET") {
      const current = +(req.query.current || 1) - 1;
      const pageSize = +(req.query.pageSize || 10);
      const blogs = await Blog.findAndCountAll({
        order,
        limit: pageSize,
        offset: current * pageSize,
      });
      res.status(200).json({
        success: true,
        total: blogs.count,
        data: blogs.rows.map((row) => pick(row, order)),
      });
      return;
    }
    if (req.method === "PUT") {
      const { title, content } = req.body;
      const blog = await Blog.create({ title, content });
      res.status(200).json({ id: blog.id });
      return;
    }

    res.status(404).json({ msg: "没有该接口" });
    return;
  } catch (error) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
