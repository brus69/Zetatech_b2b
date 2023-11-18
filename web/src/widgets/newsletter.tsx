import { Alert, Button, Input } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Newsletter as NewsletterApi } from "@/api/codegen";
import { requestFx } from "@/shared/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Newsletter = ({ details = 'bg-lilac' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NewsletterApi>({
    values: {
      email: "",
    },
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (data: NewsletterApi) => {
    if (isSubmit) return;

    requestFx({
      path: "/newsletters",
      method: "post",
      body: data,
    })
      .then(() => setIsSubmit(true))
      .catch((error) => {
        setError("email", { message: (error.email || []).join(", ") });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-xs px-4 py-6 text-center ${details}`}
    >
      <h2 className="text-2xl">Получайте новости первыми</h2>
      <p>Будете первыми получать новости о парсинге и наши обновления</p>

      {!isSubmit && (
        <>
          <Input.Wrapper error={errors.email?.message} className="flex-1 mb-4">
            <Input
              {...register("email")}
              type="email"
              required
              placeholder="Электронная почта"
              error={errors.email?.message}
            />
          </Input.Wrapper>

          <Button type="submit" fullWidth>
            Подписаться
          </Button>
        </>
      )}

      {isSubmit && (
        <Alert className="p-2 mt-2">Вы успешно подписались на рассылку</Alert>
      )}
    </form>
  );
};
