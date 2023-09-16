import { useCallback, useState, useEffect } from "react";

type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;

export function useAsync<T>(
  func: AsyncFunction<T>,
  dependencies: React.DependencyList = []
) {

  const { execute, ...state } = useAsyncInternal<T>(func, dependencies, true);
  useEffect(() => {
    execute();
  }, [execute]);
  return state;
}

export function useAsyncFn<T>(
  func: AsyncFunction<T>,
  dependencies: React.DependencyList = []
) {
  return useAsyncInternal<T>(func, dependencies, false);
}

function useAsyncInternal<T>(
  func: AsyncFunction<T>,
  dependencies: React.DependencyList = [],
  initialLoading = false
) {
  
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T | undefined>();

  const execute = useCallback((...params: unknown[]) => {
    setLoading(true);

    return func(...params)
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setData(undefined);
        setLoading(false);
        return Promise.reject();
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);
  return { execute, loading, error, data };
}