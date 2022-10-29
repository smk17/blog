import type { NextPage } from 'next';
import Head from 'next/head';
import { message } from 'antd';
import { useRequest } from 'ahooks';
import { MdEditor } from 'components';
import { request } from 'utils';
import { useRouter } from 'next/router';
import { useState } from 'react';

export { getServerSideProps } from 'pages/admin/utils';

const Home: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [text, onTextChange] = useState('');
  const { loading, data } = useRequest(() => request.get(`/api/blog/${id}`));
  const req = useRequest(
    (content: string) => request.patch(`/api/blog/${id}`, { data: { content } }),
    {
      manual: true,
      onSuccess() {
        message.success('更新成功');
      },
    },
  );

  if (loading) return null;

  return (
    <>
      <Head>
        <title>编辑文章 - {process.env.title}</title>
        <meta name="description" content="编辑文章" />
      </Head>

      <MdEditor defaultTitle={data.title} defaultText={data.content} onTextChange={onTextChange} />
    </>
  );
};

export default Home;
