import type { GetServerSideProps, NextPage } from 'next';
import { BlogInfo, descriptor, getBlog } from 'collections';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { initMathJax, parseMarkdown, replaceStyle, serializable } from 'utils';
import moment from 'moment';
import { useMount } from 'ahooks';
import { CODE_THEME_ID, THEME_ID, PREVIEW_ID } from 'components/MarkdownEditor/constant';
import { xcode, basic } from 'components/MarkdownEditor/theme';
import { markdownParser } from 'components/MarkdownEditor/utils/helper';

function formatDate(date: string | Date = new Date()) {
  return moment.utc(date).utcOffset('+08:00').format('YYYY-MM-DD HH:mm');
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  let blog = await descriptor(getBlog)(slug, ['title', 'content', 'description', 'createdAt']);
  blog = serializable(blog);

  if (blog) {
    blog.content = markdownParser.render(blog.content || '');
    blog.createdAt = formatDate(blog.createdAt);
    return { props: { blog } };
  }

  return { props: {} };
};

const Home: NextPage<{ blog: BlogInfo }> = ({ blog }) => {
  const router = useRouter();

  useMount(() => {
    // 初始化整体主题
    replaceStyle(THEME_ID, basic);
    // 初始化代码主题
    replaceStyle(CODE_THEME_ID, xcode);

    initMathJax();
  });
  return (
    <>
      <Head>
        <title>
          {blog.title} - {process.env.title}
        </title>
        <meta name="description" content={blog.description} />
      </Head>
      <main>
        <div className="sm:px-8 mt-16 lg:mt-32">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="xl:relative">
                  <div className="mx-auto max-w-2xl">
                    <button
                      type="button"
                      aria-label="Go back to articles"
                      className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
                      onClick={() => router.back()}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
                      >
                        <path
                          d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <article>
                      <header className="flex flex-col">
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                          {blog.title}
                        </h1>
                        <time
                          dateTime="2022-09-05"
                          className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                          <span className="ml-3">{blog.createdAt}</span>
                        </time>
                      </header>
                      <div
                        id={PREVIEW_ID}
                        className="mt-8 prose dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: blog.content! }}
                      ></div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
