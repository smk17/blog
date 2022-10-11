export * from "./request";
export * from "./render-to-body";
export * from "./parse-markdown";

export function errorToJSON(error: Error | unknown) {
  return {
    ...JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  };
}

export function serializable<T>(o: T) {
  return JSON.parse(JSON.stringify(o));
}
