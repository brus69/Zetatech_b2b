import React from "react";
import { useUnit } from "effector-react";
import Link from "next/link";
import { LkLayout } from "../ui/lk-layout";
import { $user } from "@/api/user";

export const PlanPage = () => {
  const { user } = useUnit({ user: $user });

  if (!user?.plan) {
    return (
      <div className="flex flex-col">
        <p>Тариф не подключен</p>
        <Link className="underline" href="/#pricing">
          Выбрать тариф
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <p>Ваш тариф: {user?.plan?.name}</p>
      <Link className="underline" href="/#pricing">
        Сменить тариф
      </Link>
    </div>
  );
};

PlanPage.Layout = LkLayout;
