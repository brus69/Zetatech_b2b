import React from "react";
import { IconCheck } from "@tabler/icons-react";
import { Button, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { $prices } from "../model";
import { cn } from "@/shared/lib";

const STYLES = [
  {
    textColor: "text-black",
    backgroundColor: "bg-transparent",
    buttonColor: "",
  },
  {
    textColor: "text-black",
    backgroundColor: "bg-transparent",
    buttonColor: "",
  },
  {
    textColor: "text-white",
    backgroundColor: "bg-ruby",
    buttonColor: "purpul",
    buttonClassName: "bg-lilac !text-black",
  },
];

export const Prices = () => {
  const { prices } = useUnit({ prices: $prices });

  const handleClick = () => {};

  return (
    <section className="container flex flex-col items-center justify-center">
      <Title order={2} classNames={{ root: "m-0 p-0 text-3xl sm:text-[50px]" }}>
        Тарифы
      </Title>
      <ul className="grid grid-cols-1 gap-10 p-0 mt-20 lg:grid-cols-2 2xl:grid-cols-3">
        {prices.map(({ name, price, grid }, index) => {
          const { textColor, backgroundColor, buttonColor, buttonClassName } =
            STYLES[index];

          return (
            <li
              className={`p-10 ${textColor} ${backgroundColor} flex flex-col rounded-lg shadow-md sm:min-w-[410px]`}
              key={name}
            >
              <p className="px-2 py-1 m-0 text-base text-center text-black rounded-md bg-lilac w-30 sm:w-52">
                Тариф &quot;{name}&quot;
              </p>
              <div className="flex mt-6 mb-10 sm:mb-24">
                <p className="p-0 m-0 text-2xl font-bold sm:text-5xl">
                  {price.toLocaleString("ru")} руб.
                </p>
                <p className="p-0 m-0 font-normal text-m">/месяц</p>
              </div>
              <div className="flex flex-col gap-5 mb-12 grow">
                {grid.map(({ name, value }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-5 sm:flex-row"
                  >
                    <IconCheck className="min-w-[17px] w-[17px] hidden sm:block" />
                    <p className="m-0 max-w-[163px] w-full">{name}</p>
                    <p className="m-0 text-sm max-w-[110px] w-full">{value}</p>
                  </div>
                ))}
              </div>
              <Button
                color={buttonColor}
                onClick={handleClick}
                className={cn("self-center")}
                classNames={{ root: buttonClassName }}
                variant="outline"
              >
                Выбрать
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
