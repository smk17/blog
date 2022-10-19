import { IModel, createModel } from './client';
import { createTag } from './Tag';

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

const Blog = createModel<IBlog>('Blog', {
  slug: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  type: { type: String, default: 'blog' },
  tags: { type: Array, default: [] },
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
  const tags = blog.tags || [];
  for (let inx = 0; inx < tags.length; inx++) {
    if (!tags[inx].label) {
      const { value } = tags[inx];
      const tag = await createTag({ slug: value, name: value });
      tags[inx] = { label: tag.name, value: tag._id.toString() };
    }
    delete tags[inx]['key'];
  }
  const doc = await Blog.findByIdAndUpdate(id, blog);
  if (doc === null) {
    throw Error(`Blog 不存在`);
  }
  return doc;
}

export async function createBlog(blog: IBlog) {
  const ret = await getBlog(blog.slug);
  if (ret !== null) {
    throw Error(`${blog.slug} 已存在`);
  }
  const tags = blog.tags || [];
  for (let inx = 0; inx < tags.length; inx++) {
    if (!tags[inx].label) {
      const { value } = tags[inx];
      const tag = await createTag({ slug: value, name: value });
      tags[inx] = { label: tag.name, value: tag._id.toString() };
    }
    delete tags[inx]['key'];
  }

  const doc = new Blog(blog);
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
