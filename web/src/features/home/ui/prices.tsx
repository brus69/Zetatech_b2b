import React from "react";
import { IconCheck } from "@tabler/icons-react";
import { Button, Title } from "@mantine/core";

const rates = [
  {
    name: "Начальный",
    price: 500,
    points: [
      {
        el1: "Скорость парсинга",
        el2: "средняя",
      },
      {
        el1: "Количество запросов в месяц",
        el2: "20",
      },
      {
        el1: "Поддержка",
        el2: "базовая (email)",
      },
      {
        el1: "Авто-выгрузки по расписанию",
        el2: "есть",
      },
      {
        el1: "Возможность работы со сложными структурами данных",
        el2: "нет",
      },
    ],
    textColor: "text-black",
    backgroundColor: "bg-transparent",
    buttonColor: "text-ruby bg-transparent border-solid border-ruby",
  },
  {
    name: "Стандарт",
    price: 1000,
    points: [
      {
        el1: "Скорость парсинга",
        el2: "высокая",
      },
      {
        el1: "Количество запросов в месяц",
        el2: "20",
      },
      {
        el1: "Поддержка",
        el2: "приоритетная",
      },
      {
        el1: "Авто-выгрузки по расписанию",
        el2: "есть",
      },
      {
        el1: "Возможность работы со сложными структурами данных",
        el2: "нет",
      },
    ],
    textColor: "text-black",
    backgroundColor: "bg-transparent",
    buttonColor: "text-ruby bg-transparent border-solid border-ruby",
  },
  {
    name: "Премиум",
    price: 1500,
    points: [
      {
        el1: "Скорость парсинга",
        el2: "очень высокая",
      },
      {
        el1: "Количество запросов в месяц",
        el2: "неограниченное",
      },
      {
        el1: "Поддержка",
        el2: "приоритетная",
      },
      {
        el1: "Авто-выгрузки по расписанию",
        el2: "есть",
      },
      {
        el1: "Возможность работы со сложными структурами данных",
        el2: "есть",
      },
    ],
    textColor: "text-white",
    backgroundColor: "bg-ruby",
    buttonColor: "bg-lilac text-black",
  },
];

export const Prices = () => {
  const handleClick = () => {
    console.log("добавлено в корзину");
  };

  return (
    <section className="container justify-center items-center flex flex-col">
      <Title order={2} classNames={{ root: "m-0 p-0 text-3xl sm:text-[50px]" }}>
        Тарифы
      </Title>
      <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 p-0 mt-20">
        {rates.map(
          ({
            name,
            price,
            textColor,
            backgroundColor,
            buttonColor,
            points,
          }) => (
            <li
              className={`p-10 ${textColor} ${backgroundColor} flex flex-col rounded-lg shadow-md sm:min-w-[410px]`}
              key={name}
            >
              <p
                className="bg-lilac text-black text-base text-center py-1 px-2 w-30 sm:w-52 rounded-md m-0"
              >
                Тариф &quot;{name}&quot;
              </p>
              <div className="flex mt-6 mb-10 sm:mb-24">
                <p className=" text-2xl sm:text-5xl font-bold m-0 p-0">{price.toLocaleString('ru')} руб.</p>
                <p className=" text-m font-normal m-0 p-0">/месяц</p>
              </div>
              <div className="flex flex-col gap-5">
                {points.map(({ el1, el2 }) => (
                  <div key={el1} className="flex flex-col sm:flex-row gap-5 items-center">
                    <IconCheck className="min-w-[17px] w-[17px] hidden sm:block" />
                    <p className="m-0 max-w-[163px] w-full">{el1}</p>
                    <p className="m-0 text-sm max-w-[110px] w-full">{el2}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleClick}
                classNames={{
                  root: `${buttonColor} m-0 mt-12 self-center`,
                  inner: "font-normal text-m",
                }}
              >
                Выбрать
              </Button>
            </li>
          )
        )}
      </ul>
    </section>
  );
};
