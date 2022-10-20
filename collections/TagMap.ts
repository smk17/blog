import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { createModel } from './client';

interface ITagMap {
  tagId: ObjectId;
  blogId: ObjectId;
}

export const TagMap = createModel<ITagMap>('TagMap', {
  tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
});
