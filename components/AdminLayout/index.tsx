import Link from "next/link";
import { ProLayout, PageContainer } from "procomponents";
import { defaultProps } from "./defaultProps";

interface Props {
  children?: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen">
      <ProLayout {...defaultProps}>
        <PageContainer breadcrumbRender={false}>{children}</PageContainer>
      </ProLayout>
    </div>
  );
};
