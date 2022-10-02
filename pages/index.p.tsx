import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content={process.env.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>{process.env.title}</div>
        <div>{process.env.description}</div>
      </div>
    </>
  );
};

export default Home;
