import isFunction from 'lodash/isFunction';

export const tryFunction = (fun: any, ...args: any[]) =>
  isFunction(fun) ? fun(...args) : fun;
