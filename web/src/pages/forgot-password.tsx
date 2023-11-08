import { Button, Card } from "@mantine/core";
import { useUnit } from "effector-react";
import React from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { AuthLayout } from "@/layouts/auth-layuout";
import { $step, stepChanged } from "@/features/forgot-password/model";
import { PinForm } from "@/features/forgot-password/ui/pin-form";
import { EmailForm } from "@/features/forgot-password/ui/email-form";
import { PasswordForm } from "@/features/forgot-password/ui/password-form";

const Page = () => {
  const { step, onStepChanged } = useUnit({
    step: $step,
    onStepChanged: stepChanged,
  });

  const handleBack = (event: React.MouseEvent) => {
    if (step !== "email") {
      event.preventDefault();
      onStepChanged("email");
    }
  };

  return (
    <Card m={"auto"} maw={440} className="w-full gap-5">
      {step === "success" ? (
        <>
          <h1 className="m-0 text-3xl font-medium text-center">
            Восстановление пароля
          </h1>
          <Button className="pointer-events-none">
            Пароль успешно изменен
          </Button>
          <Button
            component={Link}
            href="/login"
            variant="outline"
            color="black"
            className="mb-6"
          >
            На страницу входа
          </Button>
        </>
      ) : (
        <>
          <Link
            className="flex items-center gap-1 mb-5 hover:underline text-grey"
            href="/"
            onClick={handleBack}
          >
            <IconArrowLeft />
            Назад
          </Link>

          {step === "email" && <EmailForm />}
          {step === "pin" && <PinForm />}
          {step === "password" && <PasswordForm />}
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
