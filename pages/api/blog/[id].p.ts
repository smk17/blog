// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorToJSON } from 'utils';
import { descriptor, getBlogById, updateBlog, updateBlogContent } from 'collections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const blog = await descriptor(getBlogById)(id, [
        '_id',
        'title',
        'slug',
        'description',
        'recommend',
        'cover',
        'tags',
      ]);
      res.status(200).json(blog.toJSON());
      return;
    }

    if (req.method === 'PUT') {
      const { slug, title, tags, cover, recommend, description } = req.body;

      await descriptor(updateBlog)(id, { slug, title, tags, cover, recommend, description });
      res.status(200).json({ id });
      return;
    }

    if (req.method === 'PATCH') {
      const { content } = req.body;

      await descriptor(updateBlogContent)(id, content);
      res.status(200).json({ id });
      return;
    }

    res.status(404).json({ msg: '没有该接口' });
    return;
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
