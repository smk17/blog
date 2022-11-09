import {
  model,
  models,
  connect,
  connection,
  Schema,
  Model,
  SchemaDefinition,
  SchemaDefinitionType,
} from 'mongoose';

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type IModel = Timestamps & { _id: string };

async function dbConnect() {
  if (connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return connection.db;
  }

  return connect(process.env.MONGODB_URI);
}

function descriptor<T>(descriptor: T): T;
function descriptor(descriptor: (...args: any) => Promise<any>) {
  return async function (this: any, ...args: any) {
    await dbConnect();
    const result = await descriptor.apply(this, args);
    await connection.close();
    return result;
  };
}

export function createModel<T>(
  name: string,
  definition: SchemaDefinition<SchemaDefinitionType<T>>,
): Model<T & Timestamps, {}, {}, {}, any> {
  const schema = new Schema<any>(definition, {
    id: true,
    timestamps: true,
  });

  return models[name] || model<T & Timestamps>(name, schema);
}

export { descriptor };
