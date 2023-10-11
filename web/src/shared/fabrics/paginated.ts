import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { not, or, reset } from "patronum";
import { requestFx } from "../api";
import { cleanEmptyValues } from "../lib/object";

type Options = {
  path: string;
};

type Params = Partial<Record<string, unknown> & { page_size?: number }>;

export const $$paginated = <
  T extends { results?: unknown[]; next?: string | null; count?: number },
>({
  path,
}: Options) => {
  const $items = createStore<NonNullable<T["results"]>>([]);

  const $page = createStore(1);

  const $totalPages = createStore(0);

  const $totalItems = createStore(0);

  const fetchItemsFx = createEffect<Params, T>((params) => {
    return requestFx({
      path,
      params: {
        page_size: 12,
        ...cleanEmptyValues(params),
      },
    });
  });

  const fetchItems = createEvent<Params>();

  const attachedFetchItemsFx = attach({
    effect: fetchItemsFx,
    source: { page: $page },
    mapParams: (params: Params, source) => {
      return {
        ...(params || {}),
        ...source,
      };
    },
  });

  const loadMore = createEvent<Params>();

  const attachedFetchMoreItemsFx = attach({
    effect: fetchItemsFx,
    source: { page: $page },
    mapParams: (params: Params, source) => ({
      ...(params || {}),
      ...source,
    }),
  });

  const $loading = or(
    attachedFetchMoreItemsFx.pending,
    attachedFetchItemsFx.pending
  );

  sample({
    clock: fetchItems,
    filter: not(attachedFetchItemsFx.pending),
    target: attachedFetchItemsFx,
  });

  sample({
    clock: loadMore,
    filter: not(attachedFetchMoreItemsFx.pending),
    target: attachedFetchMoreItemsFx,
  });

  $items
    .on(attachedFetchMoreItemsFx.doneData, (state, paginated) =>
      state.concat(...(paginated.results || []))
    )
    .on(attachedFetchItemsFx.doneData, (_, paginated) => paginated.results);

  $page.on(attachedFetchMoreItemsFx.doneData, (state) => state + 1);

  const pageChanged = createEvent<number>();
  $page.on(pageChanged, (_, page) => page);

  const $hasNextPage = createStore(false);

  sample({
    clock: attachedFetchMoreItemsFx.fail,
    fn: () => false,
    target: $hasNextPage,
  });

  $hasNextPage.on(
    attachedFetchMoreItemsFx.doneData,
    (_, { next }) => next !== null
  );

  $totalItems.on(
    [attachedFetchMoreItemsFx.doneData, attachedFetchItemsFx.doneData],
    (_, { count }) => count || 0
  );

  $totalPages.on(
    [attachedFetchMoreItemsFx.done, attachedFetchItemsFx.done],
    (_, { params, result }) => {
      const totalPages = Math.ceil(result.count! / params.page_size!);

      return Number.isNaN(totalPages) ? 0 : totalPages;
    }
  );

  const resetStores = createEvent();

  reset({
    clock: resetStores,
    target: [$page, $hasNextPage, $items, $totalItems],
  });

  return {
    $items,
    $page,
    $totalPages,
    $totalItems,
    $hasNextPage,

    $loading,

    fetchItems,

    loadMore,
    pageChanged,

    resetStores,
  };
};
