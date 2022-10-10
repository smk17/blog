import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ProTable } from "procomponents";
import { PlusOutlined } from "@ant-design/icons";
import { request } from "utils";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>文章管理 - {process.env.title}</title>
        <meta name="description" content="文章管理" />
      </Head>
      <ProTable
        cardBordered
        rowKey="id"
        request={(params = {}) => request.get("/api/blog", { params })}
        columns={[
          {
            title: "标题",
            dataIndex: "title",
            ellipsis: true,
          },
          {
            title: "操作",
            width: 120,
            valueType: "option",
            key: "option",
            render: (_, record) => [
              <Link key="editable" href={`/admin/blog/${record.id}`}>
                <a>编辑</a>
              </Link>,
              <Link key="view" href={`/blog/${record.id}`}>
                <a target="_blank">查看</a>
              </Link>,
            ],
          },
        ]}
        toolBarRender={() => [
          <Link key="new" href={`/admin/blog/new`}>
            <a className="flex items-center gap-1">
              <PlusOutlined />
              新建
            </a>
          </Link>,
        ]}
      />
    </>
  );
};

export default Home;
