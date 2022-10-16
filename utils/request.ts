import { extend } from 'umi-request';

const request = extend({
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { request };
