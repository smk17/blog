import { createModel } from './client';

interface IUser {
  name: string;
  nickname: string;
  email?: string;
  phone?: string;
  image?: string;
  access?: string;
}

const User = createModel<IUser>('User', {
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  access: { type: String, default: 'user' },
  email: String,
  phone: String,
  image: String,
});

export async function createUser(user: IUser) {
  const doc = new User(user);
  await doc.save();
  return doc;
}
