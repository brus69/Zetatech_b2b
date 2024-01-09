import { createEvent, createEffect, sample, createStore } from "effector";
import { pageStarted } from "../../model";
import { PaginatedProductList, Product } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const $products = createStore<Product[]>([]);

export const fetchProducts = createEvent();

export const fetchProductsFx = createEffect<unknown, PaginatedProductList>(
  async () => {
    const response = await requestFx({
      path: "/products/",
    });

    return response;
  }
);

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
  fn: (data) => {
    return data.results || [];
  },
  target: $products,
});
