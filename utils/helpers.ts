export const isNullOrEmptyArray = (arr?: unknown[] | null): boolean => {
  return !arr || arr.length === 0 || arr.every((item) => item == null);
};
