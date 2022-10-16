import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { AdminLayout } from 'components';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import 'styles/globals.css';
import 'styles/markdown/index.scss';
import 'antd/dist/antd.variable.min.css';

interface LayoutProps {
  children?: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const router = useRouter();
  if (router.route.indexOf('/admin') === 0) {
    return <AdminLayout>{children}</AdminLayout>;
  }
  return <>{children}</>;
}
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<Pick<SessionProviderProps, 'session'>>) {
  return (
    <SessionProvider refetchInterval={10} session={session}>
      <Layout>
        <Head>
          <title>{process.env.title}</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
