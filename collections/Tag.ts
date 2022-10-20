import { createModel } from './client';

interface ITag {
  slug: string;
  name: string;
  type?: string;
  count?: number;
}

export const Tag = createModel<ITag>('Tag', {
  slug: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: 'tag' },
  count: { type: Number, default: 0 },
});

export async function getTag(slug: string) {
  const doc = await Tag.findOne({ slug }).exec();
  return doc;
}

export async function getTagById(id: string) {
  const doc = await Tag.findById(id).exec();
  if (doc === null) {
    throw Error(`Blog 不存在`);
  }
  return doc;
}

export async function updateTag(id: string, tag: ITag, checkSlug = false) {
  if (checkSlug) {
    const ret = await getTag(tag.slug);
    if (ret !== null) {
      throw Error(`${tag.slug} 已存在`);
    }
  }

  const doc = await Tag.findByIdAndUpdate(id, tag);
  if (doc === null) {
    throw Error(`Tag 不存在`);
  }
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

export async function findTagAndCount(params: Pagination.Params) {
  const total = await Tag.find(params.blog).count().exec();
  const blogs = await findTag(params);

  return { success: true, total, data: blogs };
}
