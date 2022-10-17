import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Modal, message } from 'antd';
import { useRef } from 'react';
import { ProTable, ModalForm, ProFormText, ProFormSelect } from 'procomponents';
import type { ActionType, ProFormInstance } from 'procomponents';
import { PlusOutlined } from '@ant-design/icons';
import { request } from 'utils';
import { useRouter } from 'next/router';

export { getServerSideProps } from 'pages/admin/utils';

const Home: NextPage = () => {
  const router = useRouter();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const renderForm = () => {
    return (
      <>
        <ProFormText
          required
          name="title"
          label="标题"
          placeholder="请输入标题"
          rules={[{ required: true, message: '请输入标题' }]}
        />
        <ProFormText
          required
          name="slug"
          label="短链"
          placeholder="请输入短链"
          rules={[{ required: true, message: '请输入短链' }]}
        />
        <ProFormSelect
          request={(params = {}) => request.get('/api/tag/select', { params })}
          name="tags"
          label="标签"
          mode="tags"
          placeholder="请选择标签"
          fieldProps={{ labelInValue: true, fieldNames: { label: 'name', value: '_id' } }}
        />
      </>
    );
  };
  return (
    <>
      <Head>
        <title>文章管理 - {process.env.title}</title>
        <meta name="description" content="文章管理" />
      </Head>
      <ProTable
        cardBordered
        rowKey="id"
        actionRef={actionRef}
        request={(params = {}) => request.get('/api/blog', { params })}
        columns={[
          {
            title: '短链',
            dataIndex: 'slug',
            width: 200,
            render: (_, record) => (
              <Link href={`/blog/${record.slug}`}>
                <a target="_blank">{record.slug}</a>
              </Link>
            ),
          },
          {
            title: '标题',
            dataIndex: 'title',
            ellipsis: true,
          },
          {
            title: '操作',
            width: 120,
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
              <ModalForm
                key="modify"
                title="修改文章"
                autoFocusFirstInput
                trigger={<a>修改</a>}
                initialValues={record}
                onFinish={async (values) => {
                  await request.post(`/api/blog/${record._id}`, { data: values });
                  message.success('更新成功');
                  actionRef.current?.reload();
                  return true;
                }}
              >
                {renderForm()}
              </ModalForm>,
              <Link key="editable" href={`/admin/blog/${record._id}`}>
                <a>编辑内容</a>
              </Link>,
            ],
          },
        ]}
        toolBarRender={() => [
          <ModalForm
            key="new"
            formRef={formRef}
            title="新建文章"
            autoFocusFirstInput
            initialValues={{ type: 'tag' }}
            trigger={
              <a className="flex items-center gap-1">
                <PlusOutlined />
                新建
              </a>
            }
            onFinish={async (values) => {
              const ret = await request.put('/api/blog', { data: values });
              console.log('/api/blog', ret);
              Modal.confirm({
                title: '创建成功',
                content: '文章创建成功，是否立刻编辑内容',
                okText: '立刻编辑',
                closable: true,
                onOk() {
                  router.push(`/admin/blog/${ret.id}`);
                },
                onCancel() {
                  actionRef.current?.reload();
                },
              });

              formRef.current?.resetFields();
              return true;
            }}
          >
            {renderForm()}
          </ModalForm>,
        ]}
      />
    </>
  );
};

export default Home;
