import Link from 'next/link';
import { CrownFilled } from '@ant-design/icons';
import type { ProLayoutProps } from '@ant-design/pro-layout';

export const defaultProps: ProLayoutProps = {
  title: '管理后台',
  route: {
    path: '/admin',
    children: [
      {
        name: '文章',
        path: '/admin/blog',
        icon: <CrownFilled />,
        hideChildrenInMenu: true,
        children: [
          { name: '创建文章', path: '/admin/blog/new' },
          { name: '编辑文章', path: '/admin/blog/:id' },
        ],
      },
      { name: '标签', path: '/admin/tag', icon: <CrownFilled /> },
      { name: '发布', path: '/admin/release', icon: <CrownFilled /> },
      { name: '素材库', path: '/admin/resource', icon: <CrownFilled /> },
    ],
  },
  menuItemRender: (item, dom) => <Link href={item.path ?? '/admin'}>{dom}</Link>,
};
