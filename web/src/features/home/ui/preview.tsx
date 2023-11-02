import React from "react";
import { Title } from "@mantine/core";

const points = [
  {
    src: "/assets/preview/icon1.svg",
    text: "контент с закрытых разделов сайта или страниц с каптчей",
  },
  {
    src: "/assets/preview/icon2.svg",
    text: "каталог товаров с изображениями, артикул, категория, название, производитель, описание",
  },
  {
    src: "/assets/preview/icon3.svg",
    text: "отзывы клиентов на услуги и отзывы на товары",
  },
  {
    src: "/assets/preview/icon4.svg",
    text: "телефоны и email-адреса организаций",
  },
];

export const Preview = () => {
  return (
    <section className="container justify-center flex flex-col lg:flex-row">
      <div className="max-w-[620px]">
        <Title order={2} classNames={{ root: "m-0 p-0 text-3xl sm:text-[50px] text-black" }}>
          Парсим сайты любой сложности
        </Title>
        <p className="m-0 p-0 mt-7 max-w-[510px] text-dark text-xl">
          Мы собрали наиболее популярные базы компаний. Воспользуйтесь поиском,
          чтобы найти интересующую вас базу
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {points.map((el) => (
          <li
            key={el.text}
            className="flex flex-col gap-5 px-3 sm:px-7 py-12 box-border border border-solid border-light 2xl:w-80 hover:bg-light"
          >
            <img src={el.src} alt="icon" width="64px" />
            <p className="text-base m-0">{el.text}</p>
          </li>
        ))}
      </div>
    </section>
  );
};
