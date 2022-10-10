import { IModel, connect, createModel } from "./client";

interface IBlog {
  slug: string;
  title: string;
  content: string;
  status?: string;
}

export type BlogInfo = IBlog & IModel;

const Blog = createModel<IBlog>("Blog", {
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: String,
});

export async function getBlog(slug: string) {
  await connect();
  const doc = await Blog.findOne({ slug }).exec();
  return doc;
}

export async function updateBlog(id: string, blog: IBlog, checkSlug = false) {
  if (checkSlug) {
    const ret = await getBlog(blog.slug);
    if (ret !== null) {
      throw Error(`${blog.slug} 已存在`);
    }
  } else {
    await connect();
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
  const doc = new Blog(blog);
  await doc.save();
  return doc;
}

export async function findBlog({
  current,
  pageSize,
  ...blog
}: Pagination.Params) {
  await connect();
  const blogs = await Blog.find(blog)
    .skip(current * pageSize)
    .limit(pageSize)
    .sort({ _id: -1 })
    .exec();

  return blogs;
}

export async function findBlogAndCount(params: Pagination.Params) {
  const total = await Blog.count();
  const blogs = await findBlog(params);

  return { success: true, total, data: blogs };
}
