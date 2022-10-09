import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { AdminLayout } from "components";

import "styles/globals.css";
import "styles/markdown/index.scss";

interface LayoutProps {
  children?: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const router = useRouter();
  if (router.route.indexOf("/admin") === 0) {
    return <AdminLayout>{children}</AdminLayout>;
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
