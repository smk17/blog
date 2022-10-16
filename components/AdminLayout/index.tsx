import { LoadingOutlined, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/react';
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
        <ProLayout
          {...defaultProps}
          avatarProps={{
            src: session?.user?.image,
            title: session?.user?.name,
            size: 'small',
          }}
          actionsRender={() => [
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <div key="LogoutOutlined" onClick={signOutReq.run}>
              {signOutReq.loading ? <LoadingOutlined /> : <LogoutOutlined />}
            </div>,
          ]}
        >
          <PageContainer breadcrumbRender={false}>{children}</PageContainer>
        </ProLayout>
      </div>
    </Spin>
  );
};
