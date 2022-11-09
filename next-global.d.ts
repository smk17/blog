// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly title: string;
    readonly description: string;

    readonly AdminObjectId: string;
    readonly MONGODB_URI: string;
    readonly NEXTAUTH_URL: string;
    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;
  }
}

interface Window {
  MathJax: any;
  toggleDarkMode?(): void;
}

declare namespace Pagination {
  interface Params<T extends string = string> extends Record<string, any> {
    fields?: T[];
    current: number;
    pageSize: number;
  }
}

declare module 'formstream';
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
