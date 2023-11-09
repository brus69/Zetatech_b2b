export const cleanEmptyValues = (obj: Record<string, unknown>) => {
  if (!obj) return obj;

  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
};
