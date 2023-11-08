import {
  Alert,
  Button,
  Card,
  Input,
  InputWrapper,
  PasswordInput,
} from "@mantine/core";
import React, { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/layouts/auth-layuout";
import { AuthTabs } from "@/widgets/auth-tabs";
import { PhoneInput } from "@/shared/ui/phone-input";
import { requestFx } from "@/shared/api";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    values: {
      name: "",
      phone: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = ({ passwordConfirmation, ...data }: any) => {
    requestFx({
      path: "/register/",
      method: "post",
      body: data,
    })
      .then(() => {
        setIsSubmit(true);
      })
      .catch((error) => {
        Object.keys(error).map((key: any) => {
          setError(key, { message: error[key]?.join("") });
        });
      });
  };

  return (
    <Card m={"auto"} maw={640} className="w-full gap-5">
      <Link
        className="flex items-center gap-1 mb-5 hover:underline text-grey"
        href="/"
      >
        <IconArrowLeft />
        Назад
      </Link>

      <AuthTabs />

      {isSubmit && (
        <Alert className="mx-auto mt-4 w-fit" p={16}>
          На ваш почтовый ящик отправлено письмо с дальнейшими инструкциями
        </Alert>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8">
          <InputWrapper className="flex-[1_1_50%]" error={errors.name?.message}>
            <Input
              error={errors.name?.message}
              {...register("name", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              placeholder="Имя"
            />
          </InputWrapper>

          <InputWrapper
            className="flex-[1_1_50%]"
            error={errors.surname?.message}
          >
            <Input
              error={errors.surname?.message}
              {...register("surname", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              placeholder="Фамилия"
            />
          </InputWrapper>
        </div>

        <div className="flex gap-8">
          <InputWrapper
            className="flex-[1_1_50%]"
            error={errors.phone?.message}
          >
            <PhoneInput
              error={errors.phone?.message}
              {...register("phone", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              placeholder="Телефон"
            />
          </InputWrapper>

          <InputWrapper
            className="flex-[1_1_50%]"
            error={errors.email?.message}
          >
            <Input
              error={errors.email?.message}
              {...register("email", {
                required: {
                  value: true,
                  message: "Данное поле обязательно",
                },
              })}
              type="email"
              placeholder="Эл. почта"
            />
          </InputWrapper>
        </div>

        <div className="flex gap-8">
          <PasswordInput
            className="flex-[1_1_50%]"
            error={errors.password?.message}
            {...register("password", {
              required: {
                value: true,
                message: "Данное поле обязательно",
              },
              minLength: {
                value: 8,
                message: "Пароль должен содержать не менее 8 символов",
              },
            })}
            placeholder="Придумайте пароль"
          />

          <PasswordInput
            className="flex-[1_1_50%]"
            error={errors.passwordConfirmation?.message}
            {...register("passwordConfirmation", {
              required: {
                value: true,
                message: "Данное поле обязательно",
              },
              validate: (value: string) => {
                if (watch("password") !== value) {
                  return "Пароли не совпадают";
                }
              },
            })}
            placeholder="Подтвердите пароль"
          />
        </div>

        <div className="flex gap-8">
          <Button className="flex-[1_1_50%]" type="submit">
            Зарегистрироваться
          </Button>
          <p className="flex-[1_1_50%] m-0 text-sm text-gray">
            Отправляя форму, я соглашаюсь с политикой обработки и использования
            персональных данных
          </p>
        </div>
      </form>

      <div className="flex justify-center gap-4 text-grey">
        <Link href="/">Обратная связь</Link>
        <Link href="/">Соглашение</Link>
      </div>
    </Card>
  );
};

Page.Layout = AuthLayout;

export default Page;
