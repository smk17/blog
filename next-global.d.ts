// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly title: string;
    readonly description: string;
  }
}

declare namespace OreJS {
  interface Result<D> {
    total: number;
    list: D[];
  }
}
