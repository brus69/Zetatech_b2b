import { register } from "@/features/register/model";
import { Button, Card, Input, PasswordInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useUnit } from "effector-react/effector-react.mjs";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const { onRegister } = useUnit({
    onRegister: register,
  });
  const [value, setValue] = useState("Clear me");

  return (
    <Card
      m={"auto"}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      maw={360}
      className="w-full gap-4"
      component={"form"}
    >
      <h2 className="my-2">Регистрация</h2>
      <Input placeholder="Ваша почта" leftSection={<IconAt size={16} />} />
      <PasswordInput
        type="password"
        placeholder="Пароль"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <PasswordInput
        type="password"
        placeholder="Повторите пароль"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Button onClick={() => onRegister()}>Зарегистрироваться</Button>
    </Card>
  );
};

export default Page;
