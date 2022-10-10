// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly title: string;
    readonly description: string;
  }
}

declare namespace Pagination {
  interface Params {
    [key: string]: any;
    current: number;
    pageSize: number;
  }
}

declare module "*.module.less" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
