import { createEffect, createEvent, createStore, sample } from "effector";
import { Post } from "@/api/codegen";
import { requestFx } from "@/shared/api";

type PageStared = {
  slug: string;
};

export const pageStarted = createEvent<PageStared>();

export const $post = createStore<Post>(null!);

export const fetchPost = createEvent<PageStared>();

export const fetchPostFx = createEffect<PageStared, Post>(({ slug }) => {
  return requestFx({
    path: `/blog/${slug}/`,
  });
});

sample({
  clock: pageStarted,
  target: fetchPost,
});

sample({
  clock: fetchPost,
  target: fetchPostFx,
});

sample({
  clock: fetchPostFx.doneData,
  target: $post,
});
