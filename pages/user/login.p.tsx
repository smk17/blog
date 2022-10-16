import { GithubFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { BuiltInProviderType } from 'next-auth/providers';
import { getProviders, signIn } from 'next-auth/react';
import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { authOptions } from 'pages/api/auth/[...nextauth].p';
import { unstable_getServerSession } from 'next-auth/next';

interface Props {
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubFilled key="GithubFilled" />,
};

export default function SignIn({ providers }: Props) {
  if (!providers) return null;
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            className="flex items-center"
            icon={iconMap[provider.id]}
            shape="round"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  if (!providers) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
}
