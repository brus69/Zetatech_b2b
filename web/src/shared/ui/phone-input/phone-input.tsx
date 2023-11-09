import { InputProps, Input } from "@mantine/core";
import { forwardRef } from "react";

export const PhoneInput = forwardRef<
  HTMLInputElement,
  InputProps & { placeholder: string }
>((props, ref) => {
  const PATTERN = /\D/g;

  const getInputNumbersValue = (value: string) => {
    return value.replace(PATTERN, "");
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    let inputNumbersValue = getInputNumbersValue(input.value);
    let formattedInputValue = "";
    const selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length !== selectionStart) {
      return;
    }

    if (inputNumbersValue[0] === "9") {
      inputNumbersValue = `7${inputNumbersValue}`;
    }

    const firstSymbols = "+7";

    formattedInputValue = `${firstSymbols} `;

    if (inputNumbersValue.length > 1) {
      formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
    }

    input.value = formattedInputValue;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (
      event.key === "Backspace" &&
      getInputNumbersValue(input.value).length === 1
    ) {
      input.value = "";
    }

    return input;
  };

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    // @ts-ignore
    const pasted = event.clipboardData ?? window.clipboardData;
    const input = event.target as HTMLInputElement;
    const inputNumbersValue = getInputNumbersValue(input.value);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (PATTERN.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  return (
    <Input
      {...props}
      onInput={onInput}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      ref={ref}
    />
  );
});

PhoneInput.displayName = "PhoneInput";
