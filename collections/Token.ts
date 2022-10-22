import { createModel } from './client';

export interface IToken {
  token: string;
  expires_in: number;
  last_time: Date;
}

export const Token = createModel<IToken>('Token', {
  token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  last_time: { type: Date, required: true },
});

export async function getTokenById(id: string) {
  const doc = await Token.findById(id).exec();
  if (doc === null) {
    throw Error(`Token 不存在`);
  }
  return doc;
}
