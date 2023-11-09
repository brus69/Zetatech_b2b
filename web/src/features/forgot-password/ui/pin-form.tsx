import { PinInput, Button } from "@mantine/core";
import React from "react";
import { useUnit } from "effector-react";
import { $pin, confirmPin, confirmPinFx, pinChanged } from "../model";

export const PinForm = () => {
  const { onConfirmPin, loading, pin, onPinChanged } = useUnit({
    onConfirmPin: confirmPin,
    loading: confirmPinFx.pending,
    pin: $pin,
    onPinChanged: pinChanged,
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onConfirmPin();
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="m-0">Восстановление пароля</h2>
      <p className="m-0 text-sm">
        Введите код, который мы выслали на вашу эл. почту
      </p>

      <PinInput
        value={pin}
        onChange={(value) => {
          onPinChanged(value);
        }}
        placeholder="1"
        type="number"
        length={6}
        className="my-4"
        classNames={{
          pinInput: "flex-[1_1_50%] ",
          input: "bg-red-500 !h-14",
        }}
      />

      <div className="flex items-center gap-2 text-sm text-grey">
        <span>Не получили код?</span>
        <span role="button" className="underline hover:cursor-pointer">
          Повторить отправку
        </span>
      </div>
      <Button
        disabled={pin.length !== 6}
        type="submit"
        className="self-start"
        loading={loading}
      >
        Отправить
      </Button>
    </form>
  );
};
