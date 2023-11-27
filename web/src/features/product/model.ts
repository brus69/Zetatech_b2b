import { createEffect, createEvent, createStore, sample } from "effector";
import { Product } from "@/api/codegen";
import { requestFx } from "@/shared/api";

type PageStared = {
  slug: string;
};

export const pageStarted = createEvent<PageStared>();

export const $product = createStore<Product>(null!);

export const fetchProduct = createEvent<PageStared>();

export const fetchProductFx = createEffect<PageStared, Product>(({ slug }) => {
  return requestFx({
    path: `/products/${slug}/`,
  });
});

sample({
  clock: pageStarted,
  target: fetchProduct,
});

sample({
  clock: fetchProduct,
  target: fetchProductFx,
});

sample({
  clock: fetchProductFx.doneData,
  target: $product,
});
