import { Sequelize, Model, DataTypes, SyncOptions } from "sequelize";

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

export class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize }
);

export class Blog extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare status: string;
}
Blog.init(
  {
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    content: DataTypes.TEXT,
  },
  { sequelize }
);
