import { BlogInfo } from 'collections';

export const Article = (blog: BlogInfo) => {
  return (
    <article className="group relative flex flex-col items-start">
      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
        <a href="https://spotlight.tailwindui.com/articles/crafting-a-design-system-for-a-multiplanetary-future">
          <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
          <span className="relative z-10">{blog.title}</span>
        </a>
      </h2>
      <time
        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
        dateTime="2022-09-05"
      >
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </article>
  );
};
