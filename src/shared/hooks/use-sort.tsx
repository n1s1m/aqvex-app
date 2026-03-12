import { useState } from "react";

import type { Sort } from "../types/types";

export function useSort(defaultSort: Sort, onSort: (sort: Sort) => void) {
  const [sort, setSort] = useState(defaultSort);
  const handleChangeSort = (value: string) => {
    setSort(value as Sort);
    onSort(value as Sort);
  };
  return { sort, handleChangeSort: (value: string) => handleChangeSort(value as Sort) };
}