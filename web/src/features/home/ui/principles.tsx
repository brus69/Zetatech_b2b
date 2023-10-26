import React from "react";
import { Title } from "@mantine/core";

const points = [
  {
    number: "01",
    text: "Бесплатная техподдержка и Telegram-чат",
  },
  {
    number: "02",
    text: "Ежедневное обновление и добавление новых парсеров",
  },
  {
    number: "03",
    text: "Умеем обходить все существующие степени защиты от парсинга, включая капчу",
  },
];

export const Principles = () => {
  return (
    <section className="container flex flex-col justify-center items-center">
      <Title order={2} classNames={{ root: " m-0 p-0" }}>
        Надежность и профессионализм
      </Title>
      <ul className="flex flex-row gap-14 p-0 mt-20 mb-0">
        {points.map((el) => (
          <li key={el.number} className="w-96">
            <p className="m-0 text-[#00676C] text-3xl font-bold pb-3  border-black border-solid border-x-0 border-t-0 border-b">
              {el.number}
            </p>
            <p className="m-0 text-xl p-3 ">{el.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
