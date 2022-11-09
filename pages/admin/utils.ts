import type { GetServerSideProps } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth].p';
import { unstable_getServerSession } from 'next-auth/next';

export const getServerSideProps: GetServerSideProps = async function (context) {
  // @ts-ignore
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
