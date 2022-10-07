import type { GetServerSideProps, NextPage } from "next";
import type { Blog } from "utils/db";
import Head from "next/head";
import { parseMarkdown, request } from "utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  const blog = await request.get<Blog>("/api/blog/" + slug);
  blog.content = await parseMarkdown(blog.content);
  return { props: { blog } };
};

const Home: NextPage<{ blog: Blog }> = ({ blog }) => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>
          {blog.title} - {process.env.title}
        </title>
        <meta name="description" content={blog.title} />
      </Head>
      <div>{blog.title}</div>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default Home;
