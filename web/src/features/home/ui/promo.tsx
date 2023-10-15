import { Button, Input, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

export const Promo = () => {
  return (
    <section className="container">
      <div className="flex items-center gap-32 mt-16 mb-32">
        <div className="flex flex-col min-w-[410px] mr-auto">
          <Title size={70} order={1}>
            Парсинг сайтов
          </Title>

          <p>Поможем решить ваши задачи быстрее и эффективнее</p>
        </div>
        <img height={340} src="https://lipsum.app/540x340/" alt="Promo" />
      </div>

      <p className="mb-4 text-center">
        Каталог сайтов и мониторинг цен конкурентов
      </p>
      <div className="flex w-full max-w-lg m-auto">
        <Input
          className="grow"
          radius={"xs"}
          placeholder="URL - адрес или ключевое слово"
          leftSection={<IconSearch size={16} />}
        />
        <Button radius={"xs"}>Искать в каталоге</Button>
      </div>
    </section>
  );
};
