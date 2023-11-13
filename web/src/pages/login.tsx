import {
  Alert,
  Button,
  Card,
  Input,
  InputWrapper,
  PasswordInput,
} from "@mantine/core";
import { useUnit } from "effector-react";
import React from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/layouts/auth-layuout";
import { $error, login, loginFx } from "@/features/login/model";
import { TokenObtainPairRequest } from "@/api/codegen";
import { AuthTabs } from "@/widgets/auth-tabs";

const Page = () => {
  const { error, loading, onLogin } = useUnit({
    error: $error,
    onLogin: login,
    loading: loginFx.pending,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenObtainPairRequest>({
    values: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TokenObtainPairRequest) => {
    onLogin(data);
  };

  return (
    <Card m={"auto"} maw={360} className="w-full gap-5">
      <Link
        className="flex items-center gap-1 mb-5 hover:underline text-grey"
        href="/"
      >
        <IconArrowLeft />
        Назад
      </Link>

      <AuthTabs />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper error={errors.email?.message}>
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

        <PasswordInput
          {...register("password", {
            required: {
              value: true,
              message: "Данное поле обязательно",
            },
          })}
          error={errors.password?.message}
          type="password"
          placeholder="Пароль"
        />

        {error && <Alert className="px-2 py-1">{error}</Alert>}
        <Button loading={loading} type="submit">
          Войти
        </Button>
      </form>

      <Link className="text-center underline text-grey" href="/forgot-password">
        Забыли пароль?
      </Link>

      <div className="flex justify-center gap-4 text-grey">
        <Link href="/">Обратная связь</Link>
        <Link href="/">Соглашение</Link>
      </div>
    </Card>
  );
};

Page.Layout = AuthLayout;

export default Page;
