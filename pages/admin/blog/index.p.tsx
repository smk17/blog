import { usePagination } from "ahooks";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ProTable } from "procomponents";
import { request } from "utils";
import type { Blog } from "utils/db";

const Home: NextPage = () => {
  const { data, loading } = usePagination(({ current, pageSize }) =>
    request.get<OreJS.Result<Blog>>("/api/blog", {
      params: { current, pageSize },
    })
  );
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
      />
      {/* 
      {loading ? (
        <div className="flex w-full h-60 items-center justify-center">
          loading...
        </div>
      ) : (
        <div className="flex flex-col p-6">
          <div className="w-full flex justify-between mb-6">
            <div>文章列表</div>
            <div className="flex items-center gap-3">
              <Link href="/admin/blog/new">
                <a className="btn btn-primary">新增</a>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>标题</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.list.map((blog) => (
                  <tr className="hover" key={blog.id}>
                    <th>{blog.id}</th>
                    <td>{blog.title}</td>
                    <td>
                      <Link href={`/admin/blog/${blog.id}`}>
                        <a className="btn btn-link">编辑</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Home;
