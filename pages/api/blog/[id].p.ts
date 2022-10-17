// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorToJSON } from 'utils';
import { descriptor, getBlogById, updateBlog } from 'collections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const blog = await descriptor(getBlogById)(id);
      res.status(200).json(blog.toJSON());
      return;
    }

    if (req.method === 'POST') {
      const { slug, title, content, tags } = req.body;

      await descriptor(updateBlog)(id, { slug, title, content, tags });
      res.status(200).json({ id });
      return;
    }

    res.status(404).json({ msg: '没有该接口' });
    return;
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
