import type { NextPage } from "next";
import Head from "next/head";

export { getServerSideProps } from 'pages/admin/utils';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="I am a web developer helping make the world a better place through JavaScript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
