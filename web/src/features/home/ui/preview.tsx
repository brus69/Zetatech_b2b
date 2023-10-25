import React from "react";
import { Title, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

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
    <section className="container justify-center flex flex-col lg:flex-row gap-10">
      <div className="max-w-[620px]">
        <Title order={2} classNames={{ root: "m-0 p-0 mb-10" }}>
          Парсим сайты любой сложности
        </Title>
        <Input
          variant="filled"
          placeholder="поиск"
          rightSection={<IconSearch width={"24px"} />}
          classNames={{ wrapper: "max-w-[510px] rounded-md" }}
        />
        <p className=" text-base m-0 p-0 mt-5 max-w-[510px]">
          Мы собрали наиболее популярные базы компаний. Воспользуйтесь поиском,
          чтобы найти интересующую вас базу
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {points.map((el) => (
          <li
            key={el.text}
            className="flex flex-col gap-5 px-3 sm:px-7 py-12 box-border border border-solid border-[#EBECFE] 2xl:w-80 hover:bg-[#EBECFE]"
          >
            <img src={el.src} alt="icon" width="64px" />
            <p className="text-base m-0">{el.text}</p>
          </li>
        ))}
      </div>
    </section>
  );
};
