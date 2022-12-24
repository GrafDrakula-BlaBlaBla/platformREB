export const getValue = (list?: Record<string, string>, key?: string) => {
  return list && key ? list[key] : null;
};
