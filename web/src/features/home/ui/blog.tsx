import React from "react";
import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { useUnit } from "effector-react";
import { $posts } from "../model";

export const Blog = () => {
  const { posts } = useUnit({ posts: $posts });

  return (
    <section className="container flex flex-col items-center justify-center gap-5 2xl:gap-20 pb-32 3xl:flex-row 3xl:items-start">
      <div className="flex flex-col">
        <Title
          order={2}
          classNames={{ root: "m-0 p-0 mb-[24px] text-center xl:text-left text-3xl sm:text-[50px]" }}
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
      <ul className="flex flex-col xl:gap-5 p-0 m-0 xl:flex-row">
          {posts.slice(-3).map((post) => (
            <li
              key={post.title}
              className="flex flex-colp-2 w-[340px] h-[482px] box-border py-2 px-5 hover:bg-light"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="mb-7 px-2">
                  <p className="p-0 m-0 text-gray text-base">{post.pub_date}</p>
                  <p
                    className="my-2 mx-0 text-lg font-medium line-clamp-2 h-[45px]"
                    style={{ lineHeight: "130%" }}
                  >
                    {post.title}
                  </p>
                  <p className="m-0 text-dark line-clamp-3 h-[68px]">
                    {post.description}
                  </p>
                </div>
                <img
                  src={post.image}
                  alt="Image from post"
                  className="w-full h-[249px] object-cover object-center m-auto flex my-5"
                />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};
