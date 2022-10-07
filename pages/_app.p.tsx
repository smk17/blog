import "styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Link from "next/link";
import classNames from "classnames";

import "styles/markdown/index.scss";

interface LayoutProps {
  children?: React.ReactNode;
}
const menus = [
  { title: "文章", href: "/admin/blog" },
  { title: "标签", href: "/admin/tag" },
  { title: "发布", href: "/admin/release" },
  { title: "素材库", href: "/admin/resource" },
];
function Layout({ children }: LayoutProps) {
  const router = useRouter();
  if (router.route.indexOf("/admin") === 0) {
    return (
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none">
            <label
              htmlFor="admin-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-6">
            <Link href="/admin" className="btn btn-ghost normal-case text-xl">
              后台管理
            </Link>
          </div>
        </div>
        <div className="flex-1 drawer drawer-mobile">
          <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-base-100 overflow-auto">
            {children}
          </div>
          <div className="drawer-side">
            <label htmlFor="admin-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-60 bg-base-200 text-base-content">
              {menus.map(({ title, href }) => (
                <li key={title}>
                  <Link href={href}>
                    <a
                      className={classNames({
                        active: router.route === href,
                      })}
                    >
                      {title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>{process.env.title}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
