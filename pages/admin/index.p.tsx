import type { NextPage } from 'next';
import Head from 'next/head';

export { getServerSideProps } from './utils';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>工作台 - {process.env.title}</title>
        <meta name="description" content="工作台" />
      </Head>
    </>
  );
};

export default Home;
