export * from "./request";
export * from "./render-to-body";
export * from "./request";

export function errorToJSON(error: Error | unknown) {
  return {
    ...JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  };
}
