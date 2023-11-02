import { Button, Card, Input } from "@mantine/core";
import { useUnit } from "effector-react";
import React from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { AuthLayout } from "@/layouts/auth-layuout";
import { $isSent, isSentChanged } from "@/features/forgot-password/model";

const Page = () => {
  const { isSent, onIsSentChanged } = useUnit({
    isSent: $isSent,
    onIsSentChanged: isSentChanged,
  });

  return (
    <Card m={"auto"} maw={440} className="w-full gap-5" component={"form"}>
      <Link
        className="flex items-center gap-1 mb-5 underline text-grey"
        href="/"
      >
        <IconArrowLeft />
        Назад
      </Link>
      {isSent ? (
        <>
          <h2>Восстановление пароля</h2>
          <p className="text-sm">
            Введите код, который мы выслали на вашу эл. почту
          </p>

          <div className="flex items-center gap-2 text-sm text-grey">
            <span>Не получили код?</span>
            <span role="button" className="underline hover:cursor-pointer">
              Повторить отправку
            </span>
          </div>
        </>
      ) : (
        <>
          <h2>Забыли пароль?</h2>

          <p className="text-sm text-grey">
            Укажите адрес эл. почты, который вы указали при регистрации и мы
            пришлем код для восстановления пароля
          </p>

          <Input placeholder="Эл. почта" />

          <Button
            className="self-start mb-5"
            onClick={() => onIsSentChanged(true)}
          >
            Выслать код
          </Button>
        </>
      )}
      <div className="flex justify-center gap-4 text-grey">
        <Link href="/">Обратная связь</Link>
        <Link href="/">Соглашение</Link>
      </div>
    </Card>
  );
};

Page.Layout = AuthLayout;

export default Page;
