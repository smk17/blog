import dynamic from "next/dynamic";

export const ProLayout = dynamic(() => import("./ProLayout"), {
  ssr: false,
});
export const ProTable = dynamic(() => import("./ProTable"), {
    ssr: false,
  });
export const PageContainer = dynamic(() => import("./PageContainer"), {
  ssr: false,
});
