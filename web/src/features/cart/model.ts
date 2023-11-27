import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { reset } from "patronum";
import { ProductDetail } from "@/api/codegen";
import { requestFx } from "@/shared/api";
import { appStaredGate } from "@/api/app";
import { fetchInitialUserFx } from "@/api/user";

export const cartPageCate = createGate();

export const $cart = createStore<ProductDetail[]>([]);

const fetchCart = createEvent();

export const fetchCartFx = createEffect(() => {
  return requestFx({
    path: "/cart/",
  });
});

sample({
  clock: [appStaredGate.open, fetchInitialUserFx.doneData],
  target: fetchCart,
});
sample({ clock: fetchCart, target: fetchCartFx });

sample({ clock: fetchCartFx.doneData, target: $cart });

export const clearCart = createEvent();

reset({ clock: clearCart, target: $cart });

export const clearCartFx = createEffect(() => {
  return true;
});

export const $total = $cart.map((cart) =>
  cart.reduce((acc, { price }) => acc + price, 0)
);

export const addToCart = createEvent<ProductDetail>();

$cart.on(addToCart, (cart, product) => {
  return [...cart, product]
});

export const addFromToCartFX = createEffect((id: number) => {
  return requestFx({
    path: `/cart/${id}/`,
    method: "POST",
    body: {
      product_id: id,
    },
  });
});

sample({ clock: addToCart, target: addFromToCartFX, fn: (product) => product.id });

export const removeFromCart = createEvent<number>();

$cart.on(removeFromCart, (cart, productId) => {
  return cart.filter(({ id }) => id !== productId);
});

export const removeFromCartFx = createEffect((id: number) => {
  return requestFx({
    path: `/cart/${id}/`,
    method: "delete",
    body: {
      product_id: id,
    },
  });
});

sample({ clock: removeFromCart, target: removeFromCartFx });

export type Payment = "card" | "transfer";

export const paymentChanged = createEvent<Payment>();
export const $payment = createStore<Payment>("card");

sample({ clock: paymentChanged, target: $payment });
