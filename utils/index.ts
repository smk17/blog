export function errorToJSON(error: Error) {
  return {
    ...JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  };
}
