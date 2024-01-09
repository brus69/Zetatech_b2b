import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { reset } from "patronum";
import { Product } from "@/api/codegen";
import { requestFx } from "@/shared/api";

export const cartPageCate = createGate();

export const $cart = createStore<Product[]>([]);

const fetchCart = createEvent();

export const fetchCartFx = createEffect(() => {
  return requestFx({
    path: "/cart/",
  });
});

sample({ clock: cartPageCate.open, target: fetchCart });
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
