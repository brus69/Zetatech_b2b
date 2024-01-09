import { createEffect, createEvent, createStore, sample } from "effector";
import { Mark, PaginatedProductList } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { Post, PaginatedPostList } from "@/api/codegen";
import { $$paginated } from "@/shared/fabrics/paginated";

type PageStarted = {
  category?: string | string[];
  mark?: string | string[];
  page: number;
};

export const pageStarted = createEvent<PageStarted>();

export const $blogPosts = createStore<Post[]>([]);

export const fetchBlogPosts = createEvent<PageStarted>();

export const fetchBlogPostsFx = createEffect<PageStarted, PaginatedPostList>(
  (params) => {
    return requestFx({
      path: "/blog/",
      params: {
        ...params,
        page_size: 3,
      },
    });
  }
);

sample({
  clock: pageStarted,
  target: fetchBlogPosts,
});

sample({
  clock: fetchBlogPosts,
  target: fetchBlogPostsFx,
});

sample({
  clock: fetchBlogPostsFx.doneData,
  fn: (data) => {
    return data.results || [];
  },
  target: $blogPosts,
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
