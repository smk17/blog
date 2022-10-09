import { connect, createModel } from "./client";

interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

const User = createModel<IUser>("User", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

export async function createUser(user: IUser) {
  await connect();

  const doc = new User(user);
  await doc.save();
  return doc;
}
