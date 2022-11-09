import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Link from 'next/link';
import { BlogInfo, descriptor, findBlog, getBlogCount } from 'collections';
import { serializable } from 'utils';
import moment from 'moment';

const PAGESIZE = 10;

function formatDate(date: string | Date = new Date()) {
  return moment.utc(date).utcOffset('+08:00').format('YYYY-MM-DD');
}

export const getStaticPaths: GetStaticPaths = async () => {
  const total = await descriptor(getBlogCount)();
  const pages = Math.ceil(total / PAGESIZE);
  return {
    paths: Array.from({ length: pages }, (_, i) => ({ params: { current: String(i + 1) } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const current = +(context.params?.current || 1) - 1;
  const rows = await descriptor(findBlog)({ current, pageSize: PAGESIZE });
  const list = serializable(
    serializable(rows).map((row) => {
      row.createdAt = formatDate(row.createdAt);
      return row;
    }),
  );
  return { props: { list }, revalidate: 60 };
};

const Home: NextPage<{ list: BlogInfo[] }> = ({ list }) => {
  return (
    <main>
      <div className="sm:px-8 mt-16 sm:mt-32">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  文章
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  我所有关于编程、阅读、人生等的长期想法与思考，都按时间顺序收集。
                </p>
              </header>
              <div className="mt-16 sm:mt-20">
                <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                  <div className="flex max-w-3xl flex-col space-y-16">
                    {list.map((blog, inx) => (
                      <article key={inx} className="md:grid md:grid-cols-4 md:items-baseline">
                        <div className="md:col-span-3 group relative flex flex-col items-start">
                          <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                            <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                            <Link href={`/blog/${blog.slug}`}>
                              <a>
                                <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                                <span className="relative z-10">{blog.title}</span>
                              </a>
                            </Link>
                          </h2>
                          <time
                            className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                            dateTime="2022-09-05"
                          >
                            <span
                              className="absolute inset-y-0 left-0 flex items-center"
                              aria-hidden="true"
                            >
                              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                            </span>
                            {blog.createdAt}
                          </time>
                          <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {blog.description || blog.title}
                          </p>
                          <div
                            aria-hidden="true"
                            className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                          >
                            阅读更多
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                              className="ml-1 h-4 w-4 stroke-current"
                            >
                              <path
                                d="M6.75 5.75 9.25 8l-2.5 2.25"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <time
                          className="mt-1 hidden md:flex relative z-10 order-first mb-3 items-center text-sm text-zinc-400 dark:text-zinc-500"
                          dateTime="2022-09-05"
                        >
                          {blog.createdAt}
                        </time>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
