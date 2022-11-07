import type { NextPage } from 'next';
import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { request } from 'utils';
import { useRouter } from 'next/router';
import { IResource } from 'collections';
import { Modal, Form, Upload, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { useControllableValue, useBoolean } from 'ahooks';
import { ActionType, ProFormInstance, ProFormSwitch } from 'procomponents';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ProTable, ModalForm, ProFormText, ProFormSelect } from 'procomponents';

export { getServerSideProps } from 'pages/admin/utils';

interface CoverProps {
  value?: IResource;
  onChange?(value: IResource): void;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传 JPG/PNG 文件！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Cover = (props: CoverProps) => {
  const [loading, { set }] = useBoolean(false);
  const [value, onChange] = useControllableValue<IResource>(props);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      set(true);
      return;
    }
    if (info.file.status === 'done') {
      set(false);
      console.log('handleChange', info.file.response.data);
      onChange(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传封面</div>
    </div>
  );
  return (
    <Upload
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/files/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value?.url ? (
        <Image width={value.width} height={value.height} src={value.url} alt="cover" />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

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
        <ProFormText name="description" label="描述" placeholder="请输入描述" />
        <Form.Item label="封面" name="cover">
          <Cover />
        </Form.Item>
        <ProFormSwitch name="recommend" label="是否推荐到首页" />
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
        rowKey="_id"
        actionRef={actionRef}
        request={(params = {}) => request.get('/api/blog', { params })}
        columns={[
          {
            title: '短链',
            dataIndex: 'slug',
            hideInSearch: true,
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
            ellipsis: false,
          },
          {
            title: '是否推荐到首页',
            dataIndex: 'recommend',
            hideInSearch: true,
            valueType: 'select',
            valueEnum: {
              true: { text: '推荐', type: 'Success' },
              false: { text: '不推荐', type: 'Processing' },
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 160,
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
                request={() => request.get(`/api/blog/${record._id}`)}
                onFinish={async (values) => {
                  const { cover, ...params } = values;
                  await request.put(`/api/blog/${record._id}`, {
                    data: { ...params, cover: cover?.id },
                  });
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
              const { cover, ...params } = values;
              const ret = await request.post('/api/blog', {
                data: { ...params, cover: cover?.id },
              });
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
