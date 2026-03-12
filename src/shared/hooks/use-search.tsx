import { useState } from "react";

import { useDebounce } from "./use-debounce";

export function useSearch(
  defaultSearch: string,
  onSearch: (title: string) => void
) {
  const [search, setSearch] = useState(defaultSearch);
  const searchDebounce = useDebounce(300);

  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchDebounce(() => {
      onSearch(e.target.value);
    });
  };

  return { search, handleChangeSearch };
}