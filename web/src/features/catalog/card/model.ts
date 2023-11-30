import { createEffect, createEvent, createStore, sample } from 'effector'
import { Product } from '@/api/codegen'
import { requestFx } from '@/shared/api'

export const $products = createStore<Product[]>([])

type PageStarted = {
  category?: string | string[]
  mark?: string | string[]
}

export const pageStarted = createEvent<PageStarted>()

export const fetchProducts = createEvent()

export const fetchProductsFx = createEffect<unknown, Product[]>(() => {
  return requestFx({
    path: '/products/',
  })
})

sample({
  clock: pageStarted,
  target: fetchProducts,
})

sample({
  clock: fetchProducts,
  target: fetchProductsFx,
})

sample({
  clock: fetchProductsFx.doneData,
  target: $products,
})
