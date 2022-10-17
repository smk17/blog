import type { NextPage } from 'next';
import Head from 'next/head';
import { Form, Select, message } from 'antd';
import { useRequest } from 'ahooks';
import { MdEditor } from 'components';
import { request } from 'utils';
import { useRouter } from 'next/router';
import { ProForm, ProFormText } from 'procomponents';

import 'react-markdown-editor-lite/lib/index.css';

export { getServerSideProps } from 'pages/admin/utils';

const Home: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Head>
        <title>编辑文章 - {process.env.title}</title>
        <meta name="description" content="编辑文章" />
      </Head>

      <ProForm
        request={() => request.get(`/api/blog/${id}`)}
        onFinish={async (data) => {
          await request.post(`/api/blog/${id}`, { data });
          message.success('更新成功');
        }}
      >
        <Form.Item name="content" label="正文">
          <MdEditor className="min-h-[480px]" />
        </Form.Item>
      </ProForm>
    </>
  );
};

export default Home;
