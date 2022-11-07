import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const imgs = [
  { src: '/media/image-1.webp', width: 3744, height: 5616 },
  { src: '/media/image-2.webp', width: 3936, height: 2624 },
  { src: '/media/image-3.webp', width: 5760, height: 3840 },
  { src: '/media/image-4.webp', width: 2400, height: 3000 },
  { src: '/media/image-5.webp', width: 4240, height: 2384 },
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content={process.env.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="sm:px-8 mt-9">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    Seng Mitnick
                  </h1>
                  <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    I am a web developer helping make the world a better place through JavaScript.
                  </p>
                  <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
                    I am an open-source contributor and I like making things that help people with
                    their work.
                  </p>
                  <div className="mt-6 flex gap-6">
                    <a
                      className="group -m-1 p-1"
                      aria-label="Follow on Twitter"
                      href="https://twitter.com/"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                      >
                        <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"></path>
                      </svg>
                    </a>
                    <a
                      className="group -m-1 p-1"
                      aria-label="Follow on Instagram"
                      href="https://instagram.com/"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                      >
                        <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"></path>
                        <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path>
                      </svg>
                    </a>
                    <a
                      className="group -m-1 p-1"
                      aria-label="Follow on GitHub"
                      href="https://github.com/"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
                        ></path>
                      </svg>
                    </a>
                    <a
                      className="group -m-1 p-1"
                      aria-label="Follow on LinkedIn"
                      href="https://linkedin.com/"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                      >
                        <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
          <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            {imgs.map(({ src, width, height }, i) => (
              <div
                key={i}
                className={classNames(
                  'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                  i % 2 == 0 ? 'rotate-2' : '-rotate-2',
                )}
              >
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  sizes="(min-width: 640px) 18rem, 11rem"
                  width={width}
                  height={height}
                  src={src}
                  loading="lazy"
                ></Image>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:px-8 mt-24 md:mt-28">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
                  <div className="flex flex-col gap-16">
                    <article className="group relative flex flex-col items-start">
                      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                        <a href="https://spotlight.tailwindui.com/articles/crafting-a-design-system-for-a-multiplanetary-future">
                          <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                          <span className="relative z-10">
                            Crafting a design system for a multiplanetary future
                          </span>
                        </a>
                      </h2>
                      <time
                        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                        dateTime="2022-09-05"
                      >
                        <span
                          className="absolute inset-y-0 left-0 flex items-center"
                          aria-hidden="true"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                        </span>
                        September 5, 2022
                      </time>
                      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Most companies try to stay ahead of the curve when it comes to visual
                        design, but for Planetaria we needed to create a brand that would still
                        inspire us 100 years from now when humanity has spread across our entire
                        solar system.
                      </p>
                      <div
                        aria-hidden="true"
                        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                      >
                        Read article
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
                    </article>
                    <article className="group relative flex flex-col items-start">
                      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                        <a href="https://spotlight.tailwindui.com/articles/introducing-animaginary">
                          <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                          <span className="relative z-10">
                            Introducing Animaginary: High performance web animations
                          </span>
                        </a>
                      </h2>
                      <time
                        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                        dateTime="2022-09-02"
                      >
                        <span
                          className="absolute inset-y-0 left-0 flex items-center"
                          aria-hidden="true"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                        </span>
                        September 2, 2022
                      </time>
                      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        When you’re building a website for a company as ambitious as Planetaria, you
                        need to make an impression. I wanted people to visit our website and see
                        animations that looked more realistic than reality itself.
                      </p>
                      <div
                        aria-hidden="true"
                        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                      >
                        Read article
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
                    </article>
                    <article className="group relative flex flex-col items-start">
                      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                        <a href="https://spotlight.tailwindui.com/articles/rewriting-the-cosmos-kernel-in-rust">
                          <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                          <span className="relative z-10">Rewriting the cosmOS kernel in Rust</span>
                        </a>
                      </h2>
                      <time
                        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                        dateTime="2022-07-14"
                      >
                        <span
                          className="absolute inset-y-0 left-0 flex items-center"
                          aria-hidden="true"
                        >
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                        </span>
                        July 14, 2022
                      </time>
                      <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        When we released the first version of cosmOS last year, it was written in
                        Go. Go is a wonderful programming language, but it’s been a while since I’ve
                        seen an article on the front page of Hacker News about rewriting some
                        important tool in Go and I see articles on there about rewriting things in
                        Rust every single week.
                      </p>
                      <div
                        aria-hidden="true"
                        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                      >
                        Read article
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
                    </article>
                  </div>
                  <div className="space-y-10 lg:pl-16 xl:pl-24">
                    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                          className="h-6 w-6 flex-none"
                        >
                          <path
                            d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                            className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                          ></path>
                          <path
                            d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                            className="stroke-zinc-400 dark:stroke-zinc-500"
                          ></path>
                        </svg>
                        <span className="ml-3">好文推荐</span>
                      </h2>
                      <ol className="mt-6 space-y-4">
                        <li className="flex gap-4">
                          <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              Planetaria
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">CEO</dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                              aria-label="2019 until Present"
                            >
                              <time dateTime="2019">2019</time>
                              <span aria-hidden="true">—</span>
                              <time dateTime="2022">Present</time>
                            </dd>
                          </dl>
                        </li>
                        <li className="flex gap-4">
                          <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              Airbnb
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                              Product Designer
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                              aria-label="2014 until 2019"
                            >
                              <time dateTime="2014">2014</time>
                              <span aria-hidden="true">—</span>
                              <time dateTime="2019">2019</time>
                            </dd>
                          </dl>
                        </li>
                        <li className="flex gap-4">
                          <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              Facebook
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                              iOS Software Engineer
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                              aria-label="2011 until 2014"
                            >
                              <time dateTime="2011">2011</time>
                              <span aria-hidden="true">—</span>
                              <time dateTime="2014">2014</time>
                            </dd>
                          </dl>
                        </li>
                        <li className="flex gap-4">
                          <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                              Starbucks
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                              Shift Supervisor
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                              className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                              aria-label="2008 until 2011"
                            >
                              <time dateTime="2008">2008</time>
                              <span aria-hidden="true">—</span>
                              <time dateTime="2011">2011</time>
                            </dd>
                          </dl>
                        </li>
                      </ol>
                    </div>
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
