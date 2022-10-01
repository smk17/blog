import { Sequelize, DataTypes, SyncOptions } from "sequelize";

const sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_DB_DATABASE!,
  process.env.NEXT_PUBLIC_DB_USERNAME!,
  process.env.NEXT_PUBLIC_DB_PASSWORD!,
  {
    host: process.env.NEXT_PUBLIC_DB_HOST,
    dialect: "mysql",
  }
);

export const sync = async (options?: SyncOptions) => {
  await sequelize.authenticate();
  return sequelize.sync(options);
};

export const User = sequelize.define("User", {
  username: DataTypes.STRING,
  password: DataTypes.DATE,
});

export const Blog = sequelize.define("User", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});
