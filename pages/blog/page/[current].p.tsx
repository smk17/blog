import type { GetServerSideProps, NextPage } from "next";
import { Blog } from "utils/db";
import pick from "lodash/pick";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageSize = 10;
  const order = ["id", "title"];
  const current = +(context.query.current || 1) - 1;
  const blogs = await Blog.findAll({
    order,
    limit: pageSize,
    offset: current * pageSize,
  });
  const list = blogs.map((row) => pick(row, order));
  return { props: { list } };
};

const Home: NextPage<{ list: Blog[] }> = ({ list }) => {
  return (
    <div className="flex">
      {list.map((item) => (
        <Link href={`/blog/${item.id}`} key={item.id}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Home;
