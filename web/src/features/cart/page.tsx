import { Button, Checkbox, Input, Radio, Title } from "@mantine/core";
import { useGate, useUnit } from "effector-react";
import { IconPlus, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  $cart,
  $payment,
  $total,
  cartPageCate,
  clearCart,
  paymentChanged,
  removeFromCart,
} from "./model";
import { $user } from "@/api/user";
import { cn } from "@/shared/lib";

export const CartPage = () => {
  useGate(cartPageCate);

  const {
    cart,
    total,
    payment,
    onPaymentChanged,
    onClearCart,
    onRemoveFromCart,
  } = useUnit({
    cart: $cart,
    total: $total,
    payment: $payment,
    onPaymentChanged: paymentChanged,
    onClearCart: clearCart,
    onRemoveFromCart: removeFromCart,
  });

  const { user } = useUnit({
    user: $user,
  });

  const { register, handleSubmit } = useForm({
    values: {
      email: "",
      name: "",
      isRegister: true,
      isNewsletter: true,
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const Info = () => (
    <p className="mb-4 md:mb-8">
      Все выбранные вами данные придут вам в удобном формате Excel и-или
      CSV/JSON для загрузки в CRM. Часто файлы большие, поэтому мы пришлем вам
      ссылку на скачивание (если письмо не поступило, поищите его в «СПАМ»).
      ВАЖНО! Мы рекомендуем открывать файлы CSV с помощью бесплатной программы
      Notepad++ т. к. Microsoft Excel часто «ломает» данные при импорте CSV —
      файлов и может показаться, что данные, которые вы скачали, ошибочные.
    </p>
  );

  return (
    <div className="container mb-16">
      <Title className="mt-16 mb-8 text-5xl">Корзина</Title>

      {cart.length === 0 && (
        <p>
          Ваша корзина пуста, перейдите в{" "}
          <Link className="underline" href="/catalog">
            каталог
          </Link>{" "}
          чтобы добавить товары
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-8 lg:gap-16 md:flex-row",
          cart.length === 0 && "hidden"
        )}
      >
        <div className="flex flex-col grow">
          <Button
            className="self-start p-0 mb-8"
            variant="transparent"
            color="gray"
            onClick={() => onClearCart()}
          >
            <IconX className="mr-2" />
            Очистить
          </Button>

          <ul className="p-0 m-0 divide-y divide-gray divide-solid">
            {cart.map((product) => (
              <li key={product.id} className="my-2 border-x-0">
                <Link
                  className="flex items-center gap-2"
                  href={`/product/${product.slug}`}
                >
                  <Button
                    onClick={() => onRemoveFromCart(product.id)}
                    className="p-0"
                    variant="transparent"
                    color="gray"
                  >
                    <IconX />
                  </Button>
                  <p className="mr-auto">{product.title}</p>
                  <span className="text-lg font-medium">
                    {product.price} руб.
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="flex items-center justify-end gap-5">
            Сумма заказа
            <span className="m-0 text-lg font-bold">{total} руб.</span>
          </p>

          {user ? (
            <>
              <Info />

              <Checkbox
                defaultChecked
                size="md"
                label="Хочу быть в курсе новинок баз компании и свежих новостей"
                {...register("isNewsletter")}
              />
            </>
          ) : (
            <>
              <p className="mb-8 text-2xl font-medium">
                Укажите данные для оплаты
              </p>

              <Input.Wrapper className="mb-8 max-w-[400px]" label="Ваше имя">
                <Input placeholder="Например: Олег" {...register("name")} />
              </Input.Wrapper>

              <div className="flex flex-col gap-10 mb-8 lg:items-center lg:flex-row">
                <Input.Wrapper
                  className="max-w-[400px] w-full"
                  label="Электронная почта для получения данных*"
                >
                  <Input
                    required
                    type="email"
                    placeholder="Например: example@mail.ru"
                    {...register("email")}
                  />
                </Input.Wrapper>

                <Checkbox
                  className="lg:mt-6"
                  defaultChecked
                  size="md"
                  label="Хочу зарегистрироваться"
                  {...register("isRegister")}
                />
              </div>

              <Info />
            </>
          )}
        </div>
        <div className="md:max-w-[360px] w-full flex flex-col p-5 lg:p-10 border border-solid !border-gray gap-5 text-xs h-fit">
          <div className="flex items-center justify-between pb-2 text-base border-0 border-b border-solid !border-b-gray">
            Промокод <IconPlus className="text-gray" />
          </div>

          <div>
            <p className="mt-0 mb-2 font-bold">Итог</p>
            <p className="m-0 text-3xl font-medium">{total} руб.</p>
          </div>

          <Radio
            checked={payment === "card"}
            onChange={() => onPaymentChanged("card")}
            label="Оплата банковской картой"
          />

          <p>
            Оплата с помощью банковской карты. Мы не храним и не обрабатываем
            данные ваших карт. Оплата производится через сервис ROBOKASSA
            согласно ФЗ-54
          </p>
          <Radio
            checked={payment === "transfer"}
            onChange={() => onPaymentChanged("transfer")}
            label="Оплата по безналичному расчету"
          />
          <p>
            Мы сформируем и отправим счет на оплату на вашу электронную почту.
            Заказ будет обработан после поступления денежных средств на наш счет
          </p>

          <Button type="submit" className="self-start">
            Оплатить заказ
          </Button>
        </div>
      </form>
    </div>
  );
};
