import React from "react";
import { Title, Input, Button } from "@mantine/core";

export const Newsletter = () => {
  const handleSubmit = (event) => {
    console.log("сабмит формы");
    event.preventDefault();
  };

  return (
    <section className="w-full flex flex-col justify-center items-center bg-light py-28">
      <div className="container max-w-[810px] px-3">
        <div className="flex flex-col lg:flex-row">
          <div className="">
            <Title
              order={2}
              classNames={{
                root: "md:text-[50px] text-3xl m-0 p-0 text-black",
              }}
            >
              Давайте созвонимся!
            </Title>
            <p className="max-w-[480px] mt-7 mb-0 text-dark text-xl">
              Оставьте свой номер — мы позвоним и ответим на все ваши вопросы
            </p>
          </div>
          <img
            src="/assets/newsletter/plane.png"
            alt="Plane icon"
            className="md:m-0 mx-3"
          />
        </div>
        <div className=" mt-12 lg:mt-7 flex flex-col lg:flex-row gap-5">
          <Input
            placeholder="Ваше имя"
            classNames={{
              input: "placeholder:text-gray text-sm shadow-md w-72 h-12",
            }}
          />
          <Input
            placeholder="Номер телефона"
            classNames={{
              input: "placeholder:text-gray text-sm shadow-md w-72 h-12",
            }}
          />
          <Button
            type="submit"
            classNames={{
              root: "bg-ruby py-3 px-6 box-border disabled:bg-transparent h-12",
              inner: "font-normal text-m text-white",
            }}
            onClick={handleSubmit}
          >
            Отправить
          </Button>
        </div>
        <p className="text-gray text-left self-start m-0 mt-5">
          Нажимая на кнопку, я соглашаюсь на Обработку персональных данных
        </p>
      </div>
    </section>
  );
};
