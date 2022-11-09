import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { IModel, createModel } from './client';
import { getResourceById } from './Resource';
import { createTag, getTagById, Tag } from './Tag';
import { TagMap } from './TagMap';

interface IBlog {
  slug: string;
  title: string;
  description?: string;
  cover?: ObjectId;
  content?: string;
  status?: string;
  type?: string;
  recommend?: boolean;
  tags?: Array<{ value: string; label: string; key?: string }>;
}

export type BlogInfo = IBlog & IModel;

export const Blog = createModel<IBlog>('Blog', {
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  type: { type: String, default: 'blog' },
  tags: [{ value: String, label: String }],
  cover: { type: Schema.Types.ObjectId, ref: 'Resource' },
  recommend: Boolean,
  status: String,
});

export async function getBlog(slug: string, fields: Array<keyof BlogInfo> = ['_id']) {
  const doc = await Blog.findOne({ slug }, fields).exec();
  return doc;
}

export async function getBlogById(id: string, fields: Array<keyof BlogInfo> = ['_id']) {
  const doc = await Blog.findById(id, fields).exec();
  if (doc === null) {
    throw Error(`Blog 不存在`);
  }
  return doc;
}

export async function updateBlog(
  id: string,
  blog: Omit<IBlog, 'cover'> & { cover?: string },
  checkSlug = false,
) {
  if (checkSlug) {
    const ret = await getBlog(blog.slug);
    if (ret !== null) {
      throw Error(`${blog.slug} 已存在`);
    }
  }
  const doc = await getBlogById(id);

  // 初始化 tags
  const tags = blog.tags || [];
  const oldTags = doc.tags || [];
  const oldTagIds = oldTags.map((t) => t.value);
  const tagIds = tags.map((t) => t.value);
  const interTags = tags.filter((v) => oldTagIds.includes(v.value));
  const diffTags = tags
    .concat(oldTags)
    .filter((v) => !tagIds.includes(v.value) || !oldTagIds.includes(v.value));
  const delTags = diffTags.filter((v) => oldTagIds.includes(v.value));
  const newTags = diffTags.filter((v) => tagIds.includes(v.value));
  const tagMap: ObjectId[] = [];
  for (let inx = 0; inx < newTags.length; inx++) {
    if (!newTags[inx].label) {
      const { value } = newTags[inx];
      const tag = await createTag({ slug: value, name: value, count: 1 });
      newTags[inx] = { label: tag.name, value: tag._id.toString() };
      tagMap[inx] = tag._id;
    } else {
      const tag = await getTagById(newTags[inx].value);
      if (!tag.count) tag.count = 0;
      tag.count += 1;
      tag.save();
      tagMap[inx] = tag._id;
    }
    delete newTags[inx]['key'];
  }

  // 初始化 更新 所有属性
  for (const key in blog) {
    if (Object.prototype.hasOwnProperty.call(blog, key)) {
      // @ts-ignore
      doc[key] = blog[key as keyof IBlog];
    }
  }

  // 更新 cover
  if (blog.cover) {
    doc.cover = (await getResourceById(blog.cover))._id;
  }

  // 更新 tags
  doc.tags = [...interTags, ...newTags];
  await Promise.all(tagMap.map((tagId) => new TagMap({ tagId, blogId: doc._id }).save()));
  await Promise.all(
    delTags.map(async (tag) => {
      const t = await Tag.findById(tag.value);
      if (t) {
        const tm = await TagMap.findOne({ tagId: t.id, blogId: doc._id });
        await tm?.remove();
        if (t.count) {
          t.count -= 1;
          await t.save();
        }
      }
    }),
  );

  await doc.save();
  return doc;
}

export async function updateBlogContent(id: string, content: string) {
  const doc = await Blog.findByIdAndUpdate(id, { content });
  if (doc == null) {
    throw Error(`Blog 不存在`);
  }
  return;
}

export async function createBlog(blog: Omit<IBlog, 'cover'> & { cover?: string }) {
  const ret = await getBlog(blog.slug);
  if (ret !== null) {
    throw Error(`${blog.slug} 已存在`);
  }
  const tagMap: ObjectId[] = [];
  const tags = blog.tags || [];
  for (let inx = 0; inx < tags.length; inx++) {
    if (!tags[inx].label) {
      const { value } = tags[inx];
      const tag = await createTag({ slug: value, name: value, count: 1 });
      tags[inx] = { label: tag.name, value: tag._id.toString() };
      tagMap[inx] = tag._id;
    } else {
      const tag = await getTagById(tags[inx].value);
      if (!tag.count) tag.count = 0;
      tag.count += 1;
      tag.save();
      tagMap[inx] = tag._id;
    }
    delete tags[inx]['key'];
  }
  if (blog.cover) {
    (<IBlog>blog).cover = (await getResourceById(blog.cover))._id;
  }
  const doc = new Blog(blog);
  await Promise.all(tagMap.map((tagId) => new TagMap({ tagId, blogId: doc._id }).save()));
  await doc.save();
  return doc;
}

export async function findBlog({
  current,
  pageSize,
  fields,
  ...blog
}: Pagination.Params) {
  const blogs = await Blog.find(blog, fields)
    .populate('cover')
    .skip(current * pageSize)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec();

  return blogs;
}

export async function getBlogCount(blog: Record<string, any> = {}, fields?: Array<keyof BlogInfo>) {
  const total = await Blog.find(blog, fields).count().exec();
  return total;
}

export async function findBlogAndCount(params: Pagination.Params<keyof BlogInfo>) {
  const { current, pageSize, fields, ...blog } = params;
  const total = await getBlogCount(blog, fields);
  const blogs = await findBlog(params);

  return { success: true, total, data: blogs };
}
