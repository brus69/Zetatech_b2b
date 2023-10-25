import React from "react";
import { Title, Input, Button } from "@mantine/core";

export const Newsletter = () => {
  const handleSubmit = (event) => {
    console.log("сабмит формы");
    event.preventDefault();
  };

  return (
    <section className="w-full flex flex-col justify-center items-center bg-[#EBECFE] py-28">
      <div className="flex flex-col lg:flex-row">
        <div className="px-3">
          <Title order={2} classNames={{ root: "md:text-6xl text-3xl m-0 p-0" }}>
            Давайте созвонимся!
          </Title>
          <p className=" mt-7 mb-0">
            Оставьте свой номер — мы позвоним и ответим на все ваши вопросы
          </p>
        </div>
        <img src="/assets/newsletter/plane.png" alt="Plane icon" className="md:m-0 mx-3"/>
      </div>
      <div className=" mt-12 lg:mt-7 flex flex-col lg:flex-row gap-5">
        <Input
          placeholder="Ваше имя"
          classNames={{
            input: "placeholder:text-[#9B9BAB] text-sm shadow-md w-72 h-12",
          }}
        />
        <Input
          placeholder="Номер телефона"
          classNames={{
            input: "placeholder:text-[#9B9BAB] text-sm shadow-md w-72 h-12",
          }}
        />
        <Button
          type="submit"
          classNames={{
            root: "bg-[#00676C] py-3 px-6 box-border disabled:bg-transparent h-12",
            inner: "font-normal text-m text-white",
          }}
          onClick={handleSubmit}
        >
          Отправить
        </Button>
      </div>
    </section>
  );
};
