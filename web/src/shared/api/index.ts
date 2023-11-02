/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect } from "effector";
import { HTTPError, Options, SearchParamsOption } from "ky";
import { API_CONFIG } from "../config";
import { api } from "./api";

type Request = {
  path?: string;
  url?: string;
  rawData?: boolean;
  body?: any;
  params?: Record<string, unknown | string | number>;
  method?: Options["method"];
  headers?: Options["headers"];
};

export const requestFx = createEffect<Request, any>(async (request) => {
  const options: Options = {
    ...request,
    searchParams: request.params as SearchParamsOption,
  };

  if (request.rawData) options.body = request.body;
  else options.json = request.body;

  try {
    const response = await api(
      (request.url || API_CONFIG.API_URL) + request.path,
      options
    );

    if (response.status === 204) return true;

    const json = await response.json();

    if (!response.ok) return Promise.reject(json);

    return json;
  } catch (error) {
    if (error instanceof HTTPError) {
      const json = await error.response.json();
      return Promise.reject(json);
    }
    return Promise.reject(error);
  }
});

export const uploadImageFx = (body: FormData) => {
  return requestFx({
    method: "POST",
    path: "/images/",
    body: body,
    rawData: true,
  });
};
