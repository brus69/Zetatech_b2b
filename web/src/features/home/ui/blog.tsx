import React from "react";
import { Title } from "@mantine/core";
import Link from "next/link";

// массив потом будем брать через rest api со ссылкой на конкретный пост? для вёрстки пока так
const posts = [
  {
    title:
      "ИИ и «отпечатки пальцев» браузеров становятся отраслевым стандартом",
    image: "/assets/blog/picture.png",
    date: "22 августа 2023",
  },
  {
    title: "Илон Маск против чужих нейросетей",
    image: "/assets/blog/picture.png",
    date: "22 августа 2023",
  },
  {
    title: "Массовый перевод сайтов",
    image: "/assets/blog/picture.png",
    date: "22 августа 2023",
  },
];

export const Blog = () => {
  return (
    <section className="flex flex-col xl:flex-row container justify-center items-center xl:items-start gap-20 pb-32">
      <div className="flex flex-col">
        <Title
          order={2}
          classNames={{ root: "m-0 p-0 mb-[24px] text-center xl:text-left" }}
        >
          Блог
        </Title>
        <p className="m-0 text-center xl:text-left w-48">
          Всё о нашей работе в парсинг-мире
        </p>
        <Link
          href="/blog"
          target="_blank"
          className="text-blck text-base bg-[#D9C6F4] py-3 px-6 rounded-md w-52 h-14 text-center mt-7"
        >
          Читать все новости
        </Link>
      </div>
        <ul className="flex flex-col gap-5 p-0 m-0 xl:flex-row">
          {posts.map((el, index) => (
            <li key={index} className="flex flex-colp-2 max-w-xs p-3 border border-solid border-[#EBECFE]">
              <Link href="/blog" target="_blank">
                <div className="h-[120px] mb-7">
                  <p className="text-md m-0 p-0 text-gray-400">{el.date}</p>
                  <p className=" text-lg m-0 mt-5 font-medium">{el.title}</p>
                </div>
                <img
                  src={el.image}
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
