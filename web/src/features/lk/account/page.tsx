import React, { useState } from "react";
import { InputWrapper, Input, PasswordInput, Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useUnit } from "effector-react";
import { IconCamera } from "@tabler/icons-react";
import { LkLayout } from "../ui/lk-layout";
import { requestFx } from "@/shared/api";
import { PhoneInput } from "@/shared/ui/phone-input";
import { $user } from "@/api/user";

export const AccountPage = () => {
  const { user } = useUnit({ user: $user });
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
    <div className="flex gap-8 grow">
      <form
        className="flex flex-col gap-5 grow md:max-w-[700px] md:mr-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              disabled
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

        <Button className="self-start" type="submit">
          Обновить данные
        </Button>
      </form>
      <div>
        <div className="w-20 h-20 mb-4 rounded-full center bg-light">
          <IconCamera />
        </div>
        <p className="text-lg font-medium">
          {user?.name || "asdfasf"} {user?.surname}
        </p>
        <p className="m-0">{user?.email || "test@g,ail.com"}</p>
        <p className="m-0">{user?.phone || "+896234214234"}</p>
      </div>
    </div>
  );
};

AccountPage.Layout = LkLayout;
