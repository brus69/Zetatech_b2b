import { Button, PasswordInput } from "@mantine/core";
import { useUnit } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { updatePassword, updatePasswordFx } from "../model";

export const PasswordForm = () => {
  const { onUpdatePassword, loading } = useUnit({
    onUpdatePassword: updatePassword,
    loading: updatePasswordFx.pending,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: any) => {
    onUpdatePassword(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-0">Забыли пароль?</h2>

      <p className="m-0 text-sm text-grey">
        Укажите адрес эл. почты, который вы указали при регистрации и мы пришлем
        код для восстановления пароля
      </p>

      <PasswordInput
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
        placeholder="Новый пароль"
      />

      <PasswordInput
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
      <Button type="submit" className="self-start mb-5" loading={loading}>
        Выслать код
      </Button>
    </form>
  );
};
