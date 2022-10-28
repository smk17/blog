import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { message } from 'antd';
import { useRef } from 'react';
import { ActionType, ProTable, ModalForm, ProFormText, ProFormSelect } from 'procomponents';
import { PlusOutlined } from '@ant-design/icons';
import { request } from 'utils';
import omit from 'lodash/omit';
import Image from 'next/image';
import { trimEnd } from 'lodash';

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
        <title>素材库 - {process.env.title}</title>
        <meta name="description" content="素材库" />
      </Head>
      <ProTable
        cardBordered
        rowKey="_id"
        actionRef={actionRef}
        request={(params = {}) => request.get('/api/resource', { params })}
        columns={[
          {
            title: '',
            hideInSearch: true,
            dataIndex: 'url',
            width: 240,
            render: (_, record) => (
              <Link href={record.url}>
                <a target="_blank" className="w-40 h-40 flex items-center justify-center">
                  <Image width={record.width} height={record.height} src={record.url} />
                </a>
              </Link>
            ),
          },
          {
            title: '名字',
            dataIndex: 'name',
            ellipsis: true,
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 200,
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            width: 160,
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
          },
        ]}
      />
    </>
  );
};

export default Home;
