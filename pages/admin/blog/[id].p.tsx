import type { GetServerSideProps } from 'next';
import { descriptor, getBlogById, BlogInfo } from 'collections';
import Head from 'next/head';
import { MarkdownEditor } from 'components';
import { serializable, request } from 'utils';
import { useRouter } from 'next/router';

import { getServerSideProps as getSSP } from 'pages/admin/utils';

interface Props {
  blog: BlogInfo;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ret: any = await getSSP(context);

  if (ret.props) {
    const id = context.query.id as string;
    const blog = await descriptor(getBlogById)(id, ['_id', 'title', 'content']);
    ret.props = { ...ret.props, blog: serializable(blog.toJSON()) };
  }
  return ret;
};

const Home = ({ blog }: Props) => {
  const router = useRouter();
  const id = router.query.id as string;

  const onPublish = (content: string) => request.patch(`/api/blog/${id}`, { data: { content } });

  return (
    <>
      <Head>
        <title>编辑文章 - {process.env.title}</title>
        <meta name="description" content="编辑文章" />
      </Head>

      <MarkdownEditor
        defaultTitle={blog.title}
        defaultValue={blog.content || ''}
        onPublish={onPublish}
      />
    </>
  );
};

export default Home;
