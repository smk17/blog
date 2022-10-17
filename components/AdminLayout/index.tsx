import { LoadingOutlined, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Spin, Button, Result } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ProLayout, PageContainer } from 'procomponents';
import { defaultProps } from './defaultProps';

interface Props {
  children?: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const signOutReq = useRequest(() => signOut(), { manual: true });
  const loading = status === 'loading';

  return (
    <Spin spinning={loading}>
      <div className="w-screen h-screen">
        {session?.user?.access ? (
          <ProLayout
            {...defaultProps}
            avatarProps={{
              src: session?.user?.image,
              title: session?.user?.name,
              size: 'small',
            }}
            actionsRender={() => [
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <div key="LogoutOutlined" onClick={signOutReq.run} title="登出">
                {signOutReq.loading ? <LoadingOutlined /> : <LogoutOutlined />}
              </div>,
            ]}
          >
            <PageContainer breadcrumbRender={false}>{children}</PageContainer>
          </ProLayout>
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="抱歉，你还没有后台管理权限，请联系管理员开通～"
            extra={
              <Link href="/">
                <Button type="primary">返回首页</Button>
              </Link>
            }
          />
        )}
      </div>
    </Spin>
  );
};
