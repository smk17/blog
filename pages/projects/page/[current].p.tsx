import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { BlogInfo, descriptor, findBlog } from "collections";
import { serializable } from "utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageSize = 10;
  const current = +(context.query.current || 1) - 1;
  const list = await descriptor(findBlog)({ current, pageSize });
  return { props: { list: serializable(list) } };
};

const Home: NextPage<{ list: BlogInfo[] }> = ({ list }) => {
  return (
    <div className="flex">
      {list.map((item) => (
        <Link href={`/blog/${item.slug}`} key={item.slug}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Home;
