import { createModel } from './client';

interface ITag {
  slug: string;
  name: string;
  count?: number;
}

const Tag = createModel<ITag>('Tag', {
  slug: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

export async function getTag(slug: string) {
  const doc = await Tag.findOne({ slug }).exec();
  return doc;
}

export async function createTag(tag: ITag) {
  const ret = await getTag(tag.slug);
  if (ret !== null) {
    throw Error(`标签 ${tag.slug} 已存在`);
  }
  const doc = new Tag(tag);
  await doc.save();
  return doc;
}

export async function findTagAll() {
  const tags = await Tag.find({}).sort({ _id: -1 }).exec();
  return tags;
}

export async function findTag({ current, pageSize, ...tag }: Pagination.Params) {
  const tags = await Tag.find(tag)
    .skip(current * pageSize)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec();

  return tags;
}
