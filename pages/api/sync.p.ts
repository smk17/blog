// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { errorToJSON } from "utils";
import { sync } from "utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(404).json({ msg: "没有该接口" });
    return;
  }
  try {
    await sync(req.body);
    res.status(200).json({ msg: "ok" });
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) });
  }
}
