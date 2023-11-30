import { createEffect, createEvent, createStore, sample } from 'effector'
import { Mark, PaginatedCatalogList, Product } from '@/api/codegen'
import { requestFx } from '@/shared/api'
import { Post, PaginatedPostList } from '@/api/codegen'
import { $$paginated } from '@/shared/fabrics/paginated'

export const $products = createStore<Product[]>([])

type PageStarted = {
  category?: string | string[]
  mark?: string | string[]
}

export const pageStarted = createEvent<PageStarted>()

export const $blogPosts = createStore<Post[]>([])

export const fetchBlogPosts = createEvent<PageStarted>()

export const fetchBlogPostsFx = createEffect<PageStarted, PaginatedPostList>(
  (params) => {
    return requestFx({
      path: '/blog/',
      params,
    })
  }
)

sample({
  clock: pageStarted,
  target: fetchBlogPosts,
})

sample({
  clock: fetchBlogPosts,
  target: fetchBlogPostsFx,
})

sample({
  clock: fetchBlogPostsFx.doneData,
  fn: (data) => {
    return data.results || []
  },
  target: $blogPosts,
})

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

export const $marks = createStore<Mark[]>([])

export const fetchMarks = createEvent()

export const fetchMarksFx = createEffect<unknown, Mark[]>(() => {
  return requestFx({
    path: '/marks/',
  })
})

sample({
  clock: pageStarted,
  target: fetchMarks,
})

sample({
  clock: fetchMarks,
  target: fetchMarksFx,
})

sample({
  clock: fetchMarksFx.doneData,
  target: $marks,
})

export const {
  $items,
  $totalItems,
  fetchItems,
  pageChanged,
  $totalPages,
  $page,
} = $$paginated<PaginatedPostList>({
  path: '/blog/',
})

sample({
  clock: [pageStarted, pageChanged],
  fn: () => {
    return {
      page_size: 12,
    }
  },
  target: fetchItems,
})
