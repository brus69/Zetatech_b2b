import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export const AuthTabs = () => {
  const router = useRouter();

  return (
    <Tabs
      value={router.pathname}
      onChange={(value) => router.push(`/${value}`)}
    >
      <Tabs.List grow className="max-w-[400px] w-full mx-auto">
        <Tabs.Tab className="text-xl flex-[1_1_50%]" value="/login">
          Вход
        </Tabs.Tab>
        <Tabs.Tab className="text-xl flex-[1_1_50%]" value="/register">
          Регистрация
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
