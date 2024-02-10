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

export const $query = createStore<{ sorting?: string | null }>({});
export const queryChanged = createEvent<{ sorting?: string | null }>();

export const $paginatedProducts = $$paginated<PaginatedProductList>({
  path: "/products/",
});

sample({
  clock: queryChanged,
  target: $query,
});

sample({
  source: {
    query: $query,
  },
  fn: ({ query }) => ({ page_size: 6, ...query }),
  clock: [pageStarted, $paginatedProducts.pageChanged, queryChanged],
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
