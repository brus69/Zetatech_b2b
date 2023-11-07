import React from "react";
import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { useUnit } from "effector-react";
import { $posts } from "../model";
import { BlogCard } from "@/widgets/blog-card";

export const Blog = () => {
  const { posts } = useUnit({ posts: $posts });

  return (
    <section className="container flex flex-col items-center justify-center gap-5 pb-32 2xl:gap-20 3xl:flex-row 3xl:items-start">
      <div className="flex flex-col">
        <Title
          order={2}
          classNames={{
            root: "m-0 p-0 mb-[24px] text-center xl:text-left text-3xl sm:text-[50px]",
          }}
        >
          Блог
        </Title>
        <p className="w-48 m-0 mb-4 text-center xl:text-left">
          Всё о нашей работе в парсинг-мире
        </p>
        <Button
          component={Link}
          href="/blog"
          color="purpul"
          classNames={{
            inner: "font-normal text-base text-black",
          }}
        >
          Читать все новости
        </Button>
      </div>

      <ul className="flex flex-col p-0 m-0 xl:gap-5 xl:flex-row grow">
        {posts.slice(-3).map((post) => (
          <BlogCard post={post} key={post.title}></BlogCard>
        ))}
      </ul>
    </section>
  );
};
