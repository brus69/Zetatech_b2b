import { createEffect, createEvent, createStore, sample } from "effector";
import { Mark, Product } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const pageStarted = createEvent();

export const $products = createStore<Product[]>([]);

export const fetchProducts = createEvent();

export const fetchProductsFx = createEffect<unknown, Product[]>(() => {
  return requestFx({
    path: "/products/",
  });
});

sample({
  clock: pageStarted,
  target: fetchProducts,
});

sample({
  clock: fetchProducts,
  target: fetchProductsFx,
});

sample({
  clock: fetchProductsFx.doneData,
  target: $products,
});

export const $marks = createStore<Mark[]>([]);

export const fetchMarks = createEvent();

export const fetchMarksFx = createEffect<unknown, Mark[]>(() => {
  return requestFx({
    path: "/marks/",
  });
});

sample({
  clock: pageStarted,
  target: fetchMarks,
});

sample({
  clock: fetchMarks,
  target: fetchMarksFx,
});

sample({
  clock: fetchMarksFx.doneData,
  target: $marks,
});
