import { ObjectId } from 'mongodb';
import { createModel } from './client';

interface IResource {
  tagId: ObjectId;
  blogId: ObjectId;
}

export const Resource = createModel<IResource>('Resource', {
  tagId: { type: ObjectId, required: true },
  blogId: { type: ObjectId, required: true },
});
