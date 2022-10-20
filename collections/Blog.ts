import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';
import { IModel, createModel } from './client';
import { createTag, getTagById, Tag } from './Tag';
import { TagMap } from './TagMap';

interface IBlog {
  slug: string;
  title: string;
  cover?: string;
  content?: string;
  status?: string;
  type?: string;
  tags?: Array<{ value: string; label: string; key?: string }>;
}

export type BlogInfo = IBlog & IModel;

export const Blog = createModel<IBlog>('Blog', {
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  type: { type: String, default: 'blog' },
  tags: [{ value: String, label: String }],
  cover: String,
  status: String,
});

export async function getBlog(slug: string) {
  const doc = await Blog.findOne({ slug }).exec();
  return doc;
}

export async function getBlogById(id: string) {
  const doc = await Blog.findById(id).exec();
  if (doc === null) {
    throw Error(`Blog 不存在`);
  }
  return doc;
}

export async function updateBlog(id: string, blog: IBlog, checkSlug = false) {
  if (checkSlug) {
    const ret = await getBlog(blog.slug);
    if (ret !== null) {
      throw Error(`${blog.slug} 已存在`);
    }
  }
  const doc = await getBlogById(id);
  const oldTags = doc.tags || [];
  const tags = blog.tags || [];
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

export async function createBlog(blog: IBlog) {
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

  const doc = new Blog(blog);
  await Promise.all(tagMap.map((tagId) => new TagMap({ tagId, blogId: doc._id }).save()));
  await doc.save();
  return doc;
}

export async function findBlog({ current, pageSize, ...blog }: Pagination.Params) {
  const blogs = await Blog.find(blog)
    .skip(current * pageSize)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec();

  return blogs;
}

export async function findBlogAndCount(params: Pagination.Params) {
  const total = await Blog.find(params.blog).count().exec();
  const blogs = await findBlog(params);

  return { success: true, total, data: blogs };
}
