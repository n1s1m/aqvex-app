import { useState, startTransition } from "react";

import { fetchProducts } from "../api/api";
import type { Sort } from "../types/types";

export function useProducts({ search }: { search: string }) {
  const defaultSearch = "";
  const defaultSort: Sort = "rating";
  const [paginatedProductsPromise, setProductsPromise] = useState(() =>
    fetchProducts({
      page: 1,
      search,
      sort: defaultSort,
    })
  );

  const refetchProducts = async ({
    page,
    search,
    sort,
  }: {
    page?: number;
    search?: string;
    sort?: Sort;
  }) =>
    startTransition(async () => {
      page = page ?? (await paginatedProductsPromise).page;
      startTransition(() =>
        setProductsPromise(
          fetchProducts({
            search: search ?? defaultSearch,
            page,
            sort: sort ?? defaultSort,
          })
        )
      );
    });

  return {
    paginatedProductsPromise,
    refetchProducts,
    defaultSort,
    defaultSearch,
  };
}