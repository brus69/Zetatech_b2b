import React from "react";
import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { useUnit } from "effector-react";
import { $posts } from "../model";

export const Blog = () => {
  const { posts } = useUnit({ posts: $posts });

  return (
    <section className="container flex flex-col items-center justify-center gap-20 pb-32 xl:flex-row xl:items-start">
      <div className="flex flex-col">
        <Title
          order={2}
          classNames={{ root: "m-0 p-0 mb-[24px] text-center xl:text-left" }}
        >
          Блог
        </Title>
        <p className="w-48 m-0 mb-4 text-center xl:text-left">
          Всё о нашей работе в парсинг-мире
        </p>
        <Button component={Link} href="/blog" color="purpul">
          Читать все новости
        </Button>
      </div>
      <ul className="flex flex-col gap-5 p-0 m-0 xl:flex-row">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-colp-2 max-w-xs p-3 border border-solid border-[#EBECFE]"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="h-[120px] mb-7">
                <p className="p-0 m-0 text-gray-400 text-md">{post.pub_date}</p>
                <p className="m-0 mt-5 text-lg font-medium ">{post.title}</p>
              </div>
              <img
                src={post.image}
                alt="Image from post"
                className="w-[250px] h-[300px] sm:w-[300px] sm:h-[360px] object-contain object-center m-auto flex"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
