import { ObjectId } from 'mongodb';
import { createModel } from './client';

interface IRelease {
  tagId: ObjectId;
  blogId: ObjectId;
}

export const Release = createModel<IRelease>('Release', {
  tagId: { type: ObjectId, required: true },
  blogId: { type: ObjectId, required: true },
});
