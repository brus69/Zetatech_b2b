import { Input, Button } from "@mantine/core";
import { useUnit } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { sendCode, sendCodeFx } from "../model";

export const EmailForm = () => {
  const { onSendCode, loading } = useUnit({
    onSendCode: sendCode,
    loading: sendCodeFx.pending,
  });

  const { register, handleSubmit } = useForm({
    values: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    onSendCode(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-0">Забыли пароль?</h2>

      <p className="m-0 text-sm text-grey">
        Укажите адрес эл. почты, который вы указали при регистрации и мы пришлем
        код для восстановления пароля
      </p>

      <Input
        {...register("email", { required: true })}
        placeholder="Эл. почта"
        type="email"
      />

      <Button type="submit" className="self-start mb-5" loading={loading}>
        Выслать код
      </Button>
    </form>
  );
};
