// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorToJSON } from 'utils';
import { descriptor, getTagById, updateTag } from 'collections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;

    if (req.method === 'GET') {
      const blog = await descriptor(getTagById)(id);
      res.status(200).json(blog.toJSON());
      return;
    }

    if (req.method === 'PUT') {
      const { slug, name, type } = req.body;

      await descriptor(updateTag)(id, { slug, name, type });
      res.status(200).json({ id });
      return;
    }

    res.status(404).json({ msg: '没有该接口' });
    return;
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
