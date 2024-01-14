import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { useUnit } from "effector-react";
import { $posts } from "../model";
import { BlogCard } from "@/widgets/blog-card";

export const Blog = () => {
  const { posts } = useUnit({ posts: $posts });

  return (
    <section className="container grid grid-cols-1 gap-5 pb-32 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-20 3xl:flex-row 3xl:items-start">
      <div className="flex flex-col">
        <Title
          order={2}
          classNames={{
            root: "m-0 p-0 mb-[24px] xl:text-left text-3xl sm:text-[50px]",
          }}
        >
          Блог
        </Title>
        <p className="w-48 m-0 mb-4 xl:text-left">
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

      {posts.map((post) => (
        <BlogCard post={post} key={post.title}></BlogCard>
      ))}
    </section>
  );
};
