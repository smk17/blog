import { extend } from "umi-request";

const request = extend({
  prefix: process.env.NEXT_PUBLIC_RAILS_API,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { request };
