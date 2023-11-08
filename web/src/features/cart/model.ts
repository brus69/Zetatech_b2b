import { createEffect, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

export const $cart = createStore({
  products: [
    {
      id: "1",
      name: "Парсинг магазина ЛАМОДА (LAMODA)",
      price: 750,
    },
    {
      id: "2",
      name: "Парсинг магазина OZON",
      price: 1500,
    },
  ],
});

export const clearCart = createEvent();

reset({ clock: clearCart, target: $cart });

export const clearCartFx = createEffect(() => {
  return true;
});

export const $total = $cart.map((cart) =>
  cart.products.reduce((acc, { price }) => acc + price, 0)
);

export const removeFromCart = createEvent<string>();

$cart.on(removeFromCart, (cart, productId) => {
  cart.products = cart.products.filter(({ id }) => id !== productId);
  return { ...cart };
});

export const removeFromCartFx = createEffect(() => {});

export type Payment = "card" | "transfer";

export const paymentChanged = createEvent<Payment>();
export const $payment = createStore<Payment>("card");

sample({ clock: paymentChanged, target: $payment });
