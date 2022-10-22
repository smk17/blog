import fs from 'fs';
import request from 'request';
import sizeOf from 'image-size';
import formstream from 'formstream';
import { File, IncomingForm } from 'formidable';
import { errorToJSON } from 'utils';
import { descriptor, createResource, IResource } from 'collections';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const file = await new Promise<File>((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, _, files) => {
          if (err) return reject(err);
          resolve(files.file as File);
        });
      });

      const ACCESS_TOKEN = await getAccessToken();
      const { width = 0, height = 0 } = sizeOf(file.filepath);
      const url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${ACCESS_TOKEN}`;
      const stat = fs.statSync(file.filepath);
      const name = file.originalFilename || file.newFilename;
      const response = await new Promise<{ url: string; errcode?: number }>((resolve, reject) => {
        const form = formstream();
        form.file('media', file.filepath, file.originalFilename, stat.size);
        const upload = request.post(
          url,
          { json: true, headers: form.headers() },
          function (err, _, body) {
            if (err) return reject(err);
            resolve(body);
          },
        );
        form.pipe(upload);
      });
      if (response.errcode) {
        throw response;
      }
      const ret: IResource = {
        url: response.url,
        size: stat.size,
        name,
        mimetype: file.mimetype!,
        hash: file.hash!,
        width,
        height,
        ratio: (height / width).toFixed(16),
      };
      const doc = await descriptor(createResource)(ret);
      res.status(200).json({ success: true, data: { ...ret, id: doc._id } });
      return;
    }
    res.status(404).json({ msg: '没有该接口' });
  } catch (error: any) {
    res.status(500).json({ success: false, ...errorToJSON(error) });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
