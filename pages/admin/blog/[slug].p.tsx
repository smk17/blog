import type { GetServerSideProps, NextPage } from "next";
import type { Blog } from "utils/db";
import Head from "next/head";
import { renderToBody, request } from "utils";
import { MdEditor } from "components";
import { useRequest, useSetState } from "ahooks";
import { pick } from "lodash";
import { useRouter } from "next/router";

import "react-markdown-editor-lite/lib/index.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  if (slug !== "new") {
    const blog = await request.get<Blog>("/api/blog/" + slug);
    return {
      props: { blog },
    };
  }
  return { props: { blog: {} } };
};

const Home: NextPage<{ blog?: Blog }> = ({ blog }) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const [state, setState] = useSetState(() => pick(blog, ["title", "content"]));

  const { run } = useRequest(
    () =>
      blog
        ? request.post(`/api/blog/${slug}`, { data: state as any })
        : request.put("/api/blog", { data: state as any }),
    {
      manual: true,
      onSuccess() {
        const unmount = renderToBody(
          <div className="toast toast-top toast-center w-40">
            <div className="alert alert-success">保存成功～</div>
          </div>
        );
        setTimeout(unmount, 2000);
      },
    }
  );
  return (
    <div className="h-full flex flex-col gap-3 p-6">
      <Head>
        <title>
          {blog?.title ? `编辑${blog?.title}` : `新文章`} - {process.env.title}
        </title>
        <meta name="description" content="文章管理" />
      </Head>

      <div className="flex items-center gap-3">
        <button className="btn btn-ghost" onClick={router.back}>
          {"<"}
        </button>
        <input
          type="text"
          placeholder="标题"
          value={state.title}
          onChange={(e) => setState({ title: e.target.value })}
          className="input flex-1 w-full"
        />
        <button className="btn btn-primary" onClick={run}>
          保存
        </button>
      </div>

      <MdEditor
        className="flex-1"
        value={state.content}
        onChange={({ text }) => setState({ content: text })}
      />
    </div>
  );
};

export default Home;
