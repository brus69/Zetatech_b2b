import React from "react";
import { Title } from "@mantine/core";
import Link from "next/link";

// массив потом будем брать через rest api со ссылкой на конкретный пост? для вёрстки пока так
const posts = [
  {
    title: "Всё о нашей работе в парсинг-мире",
    image: "/assets/rent.png",
  },
  {
    title: "Всё о нашей работе в парсинг-мире",
    image: "/assets/rent.png",
  },
  {
    title: "Всё о нашей работе в парсинг-мире",
    image: "/assets/rent.png",
  },
  {
    title: "Всё о нашей работе в парсинг-мире",
    image: "/assets/rent.png",
  },
];

export const Blog = () => {
  return (
    <section className="w-full pb-[204px] pt-[100px] bg-gray-300">
      <div className="flex flex-col gap-9 p-0 container max-w-[760px] xl:max-w-[1180px]">
        <Title
          order={2}
          classNames={{ root: "m-0 p-0 mb-[24px] text-center xl:text-left" }}
        >
          Блог
        </Title>
        <p className="m-0 text-center xl:text-left">
          Всё о нашей работе в парсинг-мире
        </p>
        <ul className="flex flex-col gap-5 p-0 m-0 xl:flex-row">
          {posts.map((el, index) => (
            <li key={index} className="flex m-auto">
              <Link href="/">
                <img
                  src={el.image}
                  alt="Image from post"
                  className="w-[280px] h-[280px]"
                />
                <p className="pt-[17px] m-0 text-[28px] max-w-[275px] font-medium">
                  {el.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
