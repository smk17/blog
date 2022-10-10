import {
  connect as mongooseConnect,
  model,
  Schema,
  SchemaDefinition,
  SchemaDefinitionType,
} from "mongoose";

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type IModel = Timestamps & { id: string };

export function connect() {
  return mongooseConnect(process.env.NEXT_PUBLIC_DB_URI!);
}

export function createModel<T>(
  name: string,
  definition: SchemaDefinition<SchemaDefinitionType<T>>
) {
  const schema = new Schema<any>(definition, {
    id: true,
    timestamps: true,
  });
  return model<T & Timestamps>(name, schema);
}
