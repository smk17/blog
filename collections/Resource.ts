import { createModel } from './client';

export interface IResource {
  url: string;
  size: number;
  name: string;
  mimetype?: string;
  hash?: string;
  ratio?: string;
  width?: number;
  height?: number;
}

export const Resource = createModel<IResource>('Resource', {
  url: { type: String, required: true },
  size: { type: Number, required: true },
  name: { type: String, required: true },
  mimetype: String,
  hash: String,
  ratio: String,
  width: Number,
  height: Number,
});

export async function createResource(resource: IResource) {
  const doc = new Resource(resource);
  await doc.save();
  return doc;
}

export async function getResourceById(id: string) {
  const doc = await Resource.findById(id).exec();
  if (doc === null) {
    throw Error(`Resource 不存在`);
  }
  return doc;
}
