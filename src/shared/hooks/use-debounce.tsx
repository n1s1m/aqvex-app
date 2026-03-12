import { useRef } from "react";

export const useDebounce = (time: number) => {
  const ref = useRef({
    timeout: 0,
  });
  const debounce = (callback: () => void) => {
    clearTimeout(ref.current.timeout);
    ref.current.timeout = setTimeout(callback, time);
  };

  return debounce;
};