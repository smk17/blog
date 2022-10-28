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

export async function findResource({ current, pageSize, ...resource }: Pagination.Params) {
  const resources = await Resource.find(resource)
    .skip(current * pageSize)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec();

  return resources;
}

export async function findResourceAndCount(params: Pagination.Params) {
  const total = await Resource.find(params.blog).count().exec();
  const blogs = await findResource(params);

  return { success: true, total, data: blogs };
}
