import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { message } from 'antd';
import { ActionType, ProTable, ModalForm, ProFormText, ProFormSelect } from 'procomponents';
import { PlusOutlined } from '@ant-design/icons';
import { request } from 'utils';
import omit from 'lodash/omit';
import { useRef } from 'react';

export { getServerSideProps } from 'pages/admin/utils';

const typeEnum = {
  all: { text: '全部', type: 'Default' },
  tag: { text: '标签', type: 'Processing' },
  categorie: { text: '分类', type: 'Success' },
  topic: { text: '专栏', type: 'Error' },
};

const Home: NextPage = () => {
  const actionRef = useRef<ActionType>();
  const renderForm = () => {
    return (
      <>
        <ProFormText
          required
          name="name"
          label="名字"
          placeholder="请输入名字"
          rules={[{ required: true, message: '请输入名字' }]}
        />
        <ProFormText
          required
          name="slug"
          label="短链"
          placeholder="请输入短链"
          rules={[{ required: true, message: '请输入短链' }]}
        />
        <ProFormSelect
          required
          name="type"
          label="类型"
          placeholder="请选择类型"
          rules={[{ required: true, message: '请选择类型' }]}
          valueEnum={omit(typeEnum, 'all')}
        />
      </>
    );
  };
  return (
    <>
      <Head>
        <title>标签管理 - {process.env.title}</title>
        <meta name="description" content="标签管理" />
      </Head>
      <ProTable
        cardBordered
        rowKey="id"
        actionRef={actionRef}
        request={(params = {}) => request.get('/api/tag', { params })}
        columns={[
          {
            title: '短链',
            dataIndex: 'slug',
            width: 200,
            render: (_, record) => (
              <Link href={`/tag/${record.slug}`}>
                <a target="_blank">{record.slug}</a>
              </Link>
            ),
          },
          {
            title: '名字',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '类型',
            dataIndex: 'type',
            width: 120,
            valueType: 'select',
            valueEnum: typeEnum,
            initialValue: ['all'],
          },
          {
            title: '引用数',
            dataIndex: 'count',
            width: 120,
          },
          {
            title: '操作',
            width: 80,
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
              <ModalForm
                key="editable"
                title="编辑标签"
                autoFocusFirstInput
                trigger={<a>编辑</a>}
                initialValues={record}
                onFinish={async (values) => {
                  await request.post(`/api/tag/${record._id}`, { data: values });
                  message.success('更新成功');
                  actionRef.current?.reload();
                  return true;
                }}
              >
                {renderForm()}
              </ModalForm>,
            ],
          },
        ]}
        toolBarRender={() => [
          <ModalForm
            key="new"
            title="新建标签"
            autoFocusFirstInput
            initialValues={{ type: 'tag' }}
            trigger={
              <a className="flex items-center gap-1">
                <PlusOutlined />
                新建
              </a>
            }
            onFinish={async (values) => {
              await request.put('/api/tag', { data: values });
              message.success('创建成功');
              actionRef.current?.reload();
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
