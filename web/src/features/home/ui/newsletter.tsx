import React from "react";
import { Title, Input, Button } from "@mantine/core";

export const Newsletter = () => {
  const handleSubmit = (event: React.MouseEvent) => {
    console.log("сабмит формы");
    event.preventDefault();
  };

  return (
    <section className="flex flex-col items-center justify-center w-full bg-light py-28">
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
            className="mx-3 md:m-0"
          />
        </div>
        <div className="flex flex-col gap-5 mt-12  lg:mt-7 lg:flex-row">
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
        <p className="self-start m-0 mt-5 text-left text-gray">
          Нажимая на кнопку, я соглашаюсь на Обработку персональных данных
        </p>
      </div>
    </section>
  );
};
