import { createEffect, createEvent, createStore, sample } from "effector";
import { PaginatedPostList, Post, TagPost } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const pageStarted = createEvent();

export const $blogPosts = createStore<Post[]>([]);

export const fetchBlogPosts = createEvent();

export const fetchBlogPostsFx = createEffect<unknown, PaginatedPostList>(() => {
  return requestFx({
    path: "/blog/",
  });
});

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
  clock: fetchBlogPosts,
  target: fetchBlogTagsFx,
});

sample({
  clock: fetchBlogTagsFx.doneData,
  target: $blogTags,
});
