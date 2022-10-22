import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { createModel } from './client';

interface IUser {
  name: string;
  nickname?: string;
  email?: string;
  phone?: string;
  image?: string;
  access?: string;
  wxAccessToken?: ObjectId;
  wxJSApiTicket?: ObjectId;
}

const User = createModel<IUser>('User', {
  name: { type: String, required: true },
  access: { type: String, default: 'user' },
  wxAccessToken: { type: Schema.Types.ObjectId, ref: 'Token' },
  wxJSApiTicket: { type: Schema.Types.ObjectId, ref: 'Token' },
  nickname: String,
  email: String,
  phone: String,
  image: String,
});

export async function createUser(user: IUser) {
  const doc = new User(user);
  await doc.save();
  return doc;
}

export async function getUserById(id: string) {
  const doc = await User.findById(id).exec();
  if (doc === null) {
    throw Error(`User 不存在`);
  }
  return doc;
}

export async function getUserByAdmin() {
  return getUserById(process.env.AdminObjectId);
}
