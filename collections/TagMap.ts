import { ObjectId } from 'mongodb';
import { createModel } from './client';

interface ITagMap {
  tagId: ObjectId;
  blogId: ObjectId;
}

export const TagMap = createModel<ITagMap>('TagMap', {
  tagId: { type: ObjectId, required: true },
  blogId: { type: ObjectId, required: true },
});
