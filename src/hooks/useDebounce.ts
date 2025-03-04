import { useEffect, useRef } from 'react';

export const useDebounce = <T = void>(
  callback: (arg: T) => void,
  delay: number,
  shouldClear = false
) => {
  const latestCallback = useRef<(arg: T) => void>(() => {});
  const latestTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (shouldClear && latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }
  }, [shouldClear]);

  return (arg: T) => {
    if (latestTimeout.current) {
      clearTimeout(latestTimeout.current);
    }

    latestTimeout.current = setTimeout(() => {
      latestCallback.current(arg);
    }, delay);
  };
};
