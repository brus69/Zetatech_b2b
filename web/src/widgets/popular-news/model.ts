import { createStore, createEvent, createEffect, sample } from "effector";
import { Post, PaginatedPostList } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const $blogPosts = createStore<Post[]>([]);

export const fetchBlogPosts = createEvent();

export const fetchBlogPostsFx = createEffect<unknown, PaginatedPostList>(() => {
  return requestFx({
    path: "/blog/",
    params: {
      page_size: 3,
    },
  });
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
