import { createEffect, createEvent, createStore, sample } from "effector";
import { Mark, PaginatedProductList } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { $$paginated } from "@/shared/fabrics/paginated";
import { fetchBlogPosts } from "@/widgets/popular-news/model";

type PageStarted = {
  category?: string | string[];
  mark?: string | string[];
  page: number;
};

export const pageStarted = createEvent<PageStarted>();

sample({
  clock: pageStarted,
  target: fetchBlogPosts,
});

export const $paginatedProducts = $$paginated<PaginatedProductList>({
  path: "/products/",
});

sample({
  fn: () => ({ page_size: 6 }),
  clock: [pageStarted, $paginatedProducts.pageChanged],
  target: $paginatedProducts.fetchItems,
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
