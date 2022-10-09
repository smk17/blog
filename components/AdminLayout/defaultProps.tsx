import Link from "next/link";
import { CrownFilled } from "@ant-design/icons";
import type { ProLayoutProps } from "@ant-design/pro-layout";

export const defaultProps: ProLayoutProps = {
  route: {
    path: "/admin",
    routes: [
      { name: "文章", path: "/admin/blog", icon: <CrownFilled /> },
      { name: "标签", path: "/admin/tag", icon: <CrownFilled /> },
      { name: "发布", path: "/admin/release", icon: <CrownFilled /> },
      { name: "素材库", path: "/admin/resource", icon: <CrownFilled /> },
    ],
  },
  avatarProps: {
    src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
    title: "Admin",
    size: "small",
  },
  menuItemRender: (item, dom) => (
    <Link href={item.path ?? "/admin"}>{dom}</Link>
  ),
};
