import React, { useState } from "react";
import { Title, Input, Button, InputWrapper, Alert } from "@mantine/core";
import { useForm } from "react-hook-form";
import { ShortApplication } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { PhoneInput } from "@/shared/ui/phone-input";

export const Newsletter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ShortApplication>({
    values: {
      phone: "",
      name: "",
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (data: ShortApplication) => {
    requestFx({
      path: "/short_applications",
      method: "post",
      body: data,
    })
      .then(() => setIsSubmit(true))
      .catch((error) => {
        setError("name", { message: error?.detail || "" });
      });
  };

  return (
    <section className="flex flex-col items-center justify-center w-full bg-light py-28">
      <div className="container max-w-[810px]">
        <div className="flex flex-col md:flex-row">
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
            className="mx-3 md:m-0 max-w-[300px]"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-12 md:mt-7 md:flex-row"
        >
          <InputWrapper error={errors.name?.message}>
            <Input
              {...register("name", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              placeholder="Ваше имя"
              error={errors.name?.message}
              classNames={{
                input: "placeholder:text-gray text-sm shadow-md md:w-72 h-12",
              }}
            />
          </InputWrapper>
          <InputWrapper error={errors.phone?.message}>
            <PhoneInput
              {...register("phone", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              placeholder="Номер телефона"
              classNames={{
                input: "placeholder:text-gray text-sm shadow-md md:w-72 h-12",
              }}
              error={errors.phone?.message}
            />
          </InputWrapper>

          <Button
            type="submit"
            classNames={{
              root: "bg-ruby py-3 px-6 box-border disabled:bg-transparent h-12",
              inner: "font-normal text-m text-white",
            }}
          >
            Отправить
          </Button>
        </form>
        <p className="self-start m-0 mt-5 text-left text-gray">
          Нажимая на кнопку, я соглашаюсь на Обработку персональных данных
        </p>
      </div>
      {isSubmit && (
        <Alert className="mt-4 w-fit" p={16}>
          Ваша обращение успешно отправлено. Мы скоро с вами свяжемся.
        </Alert>
      )}
    </section>
  );
};
