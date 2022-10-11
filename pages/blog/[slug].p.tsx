import type { GetServerSideProps, NextPage } from "next";
import { BlogInfo, descriptor, getBlog } from "collections";
import Head from "next/head";
import { parseMarkdown, serializable } from "utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  let blog = await descriptor(getBlog)(slug);
  blog = serializable(blog);
  if (blog) {
    blog.content = await parseMarkdown(blog.content);
    return { props: { blog } };
  }

  return { props: {} };
};

const Home: NextPage<{ blog: BlogInfo }> = ({ blog }) => {
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
