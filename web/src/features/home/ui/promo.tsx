import { Button, Title } from "@mantine/core";
import React from "react";

export const Promo = () => {
  return (
    <section className="container flex flex-col mt-16 mb-32">
      <Title className="mb-10 max-w-[1100px]" size={80} order={1}>
        Парсинг сайтов, магазинов и маркетплейсов{" "}
      </Title>

      <p className="mb-12 max-w-[840px]">
        Предоставим структурированные данные для вашего сайта или базу клиентов
        чтобы вы решали свои задачи быстрее и эффективнее
      </p>

      <Button className="self-start">Заполнить бриф</Button>
    </section>
  );
};
