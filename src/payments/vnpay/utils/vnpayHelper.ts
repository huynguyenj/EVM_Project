export function sortObject(object: any) {
  const sortedParams = Object.keys(object)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = encodeURIComponent(object[key]).replace(/%20/g, '+');
        return acc;
      },
      {} as Record<string, any>,
    );
  return sortedParams;
}
