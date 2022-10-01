import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Seng Mitnick</title>
        <meta
          name="description"
          content="I am a web developer helping make the world a better place through JavaScript."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
