import { ResponseError } from "../api/types";

export const mapErrors = (error: ResponseError) => {
  if (!error) return {};

  if (!("errors" in error?.errors || {}) || !error?.errors) return {};

  return error.errors.reduce(
    (acc, error) => {
      if (!error.field) return acc;

      if (error.field in acc) {
        return acc;
      }

      acc[error.field] = error.message;

      return acc;
    },
    {} as Record<string, string>
  );
};

export const errorToString = (error: ResponseError) => {
  return error.errors?.[0].message || error?.message;
};
