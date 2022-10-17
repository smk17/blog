// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { errorToJSON } from 'utils';
import { descriptor, findTagAll } from 'collections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const ret = await descriptor(findTagAll)();
      res.status(200).json(ret);
      return;
    }

    res.status(404).json({ msg: '没有该接口' });
    return;
  } catch (error) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
