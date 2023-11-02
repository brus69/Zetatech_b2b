import { Button, Card, Input, PasswordInput, Tabs } from "@mantine/core";
import { useUnit } from "effector-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { register } from "@/features/register/model";
import { AuthLayout } from "@/layouts/auth-layuout";

const Page = () => {
  const router = useRouter();
  const { onRegister } = useUnit({
    onRegister: register,
  });

  const [value, setValue] = useState("Clear me");

  return (
    <Card m={"auto"} maw={360} className="w-full gap-5" component={"form"}>
      <Link
        className="flex items-center gap-1 mb-5 underline text-grey"
        href="/"
      >
        <IconArrowLeft />
        Назад
      </Link>
      <Tabs value={"login"} onChange={(value) => router.push(`/${value}`)}>
        <Tabs.List grow>
          <Tabs.Tab className="text-xl" value="login">
            Вход
          </Tabs.Tab>
          <Tabs.Tab className="text-xl" value="register">
            Регистрация
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Input placeholder="Эл. почта" />

      <PasswordInput
        type="password"
        placeholder="Пароль"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Button onClick={() => onRegister()}>Войти</Button>

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
