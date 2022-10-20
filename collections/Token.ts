import { createModel } from './client';

interface IToken {
  token: string;
  expires_in: number;
  last_time?: Date;
}

export const Token = createModel<IToken>('Token', {
  token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  last_time: Date,
});
