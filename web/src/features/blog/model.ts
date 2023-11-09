import { createEffect, createEvent, createStore, sample } from "effector";
import { PaginatedPostList, Post, TagPost } from "@/api/codegen";
import { requestFx } from "@/shared/api";

type PageStared = {
  category?: string | string[];
  mark?: string | string[];
};

export const pageStarted = createEvent<PageStared>();

export const $blogPosts = createStore<Post[]>([]);

export const fetchBlogPosts = createEvent<PageStared>();

export const fetchBlogPostsFx = createEffect<PageStared, PaginatedPostList>(
  (params) => {
    return requestFx({
      path: "/blog/",
      params,
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
