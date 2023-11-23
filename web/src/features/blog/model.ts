import { createEffect, createEvent, createStore, sample } from "effector";
import { PaginatedPostList, TagPost } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { $$paginated } from "@/shared/fabrics/paginated";

type PageStared = {
  category?: string | string[];
  mark?: string | string[];
};

export const pageStarted = createEvent<PageStared>();

export const {
  $items,
  $totalItems,
  fetchItems,
  pageChanged,
  $totalPages,
  $page,
} = $$paginated<PaginatedPostList>({
  path: "/blog/",
});

sample({
  clock: [pageStarted, pageChanged],
  fn: () => {
    return {
      page_size: 12,
    };
  },
  target: fetchItems,
});

export const $blogTags = createStore<TagPost[]>([]);

export const fetchBlogTags = createEvent();

export const fetchBlogTagsFx = createEffect<unknown, TagPost[]>(() => {
  return requestFx({
    path: "/blog/tags/",
  });
});

sample({
  clock: pageStarted,
  target: fetchBlogTags,
});

sample({
  clock: fetchBlogTagsFx.doneData,
  target: $blogTags,
});
