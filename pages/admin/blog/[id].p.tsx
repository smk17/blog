import type { NextPage } from "next";
import Head from "next/head";
import { Form, message } from "antd";
import { MdEditor } from "components";
import { request } from "utils";
import { useRouter } from "next/router";
import { ProForm, ProFormText } from "procomponents";

import "react-markdown-editor-lite/lib/index.css";

const Home: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const isNew = id === "new";

  return (
    <>
      <Head>
        <title>
          {isNew ? `创建文章` : `编辑文章`} - {process.env.title}
        </title>
        <meta name="description" content="文章管理" />
      </Head>

      <ProForm
        request={() => request.get(`/api/blog/${id}`)}
        onFinish={async (formData) => {
          const { id, ...data } = formData;
          if (id) {
            await request.post(`/api/blog/${id}`, { data });
            message.success("更新成功");
          } else {
            await request.put(`/api/blog`, { data });
            message.success("创建成功");
          }
        }}
      >
        <ProFormText hidden name="id" />
        <ProFormText
          required
          name="title"
          label="标题"
          placeholder="请输入标题"
          rules={[{ required: true, message: "请输入标题" }]}
        />
        <ProFormText
          required
          name="slug"
          label="短名"
          placeholder="请输入短名"
          rules={[{ required: true, message: "请输入短名" }]}
        />
        <Form.Item name="content" label="正文">
          <MdEditor className="min-h-[480px]" />
        </Form.Item>
      </ProForm>
    </>
  );
};

export default Home;
