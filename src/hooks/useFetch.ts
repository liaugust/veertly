import { useEffect, useReducer } from 'react';

interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export type Cache<T> = { [url: string]: T };

enum ActionTypes {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action<T> =
  | { type: ActionTypes.LOADING }
  | { type: ActionTypes.SUCCESS; payload: T }
  | { type: ActionTypes.ERROR; payload: Error };

export const useFetch = <T = unknown>(
  url: string,
  options?: RequestInit,
  cache?: Cache<T>,
): State<T> => {
  const initialState: State<T> = {
    loading: false,
    error: null,
    data: null,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case ActionTypes.LOADING:
        return { ...initialState, loading: true };
      case ActionTypes.SUCCESS:
        return { ...initialState, data: action.payload, loading: false };
      case ActionTypes.ERROR:
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: ActionTypes.LOADING });

      if (cache?.[url]) {
        dispatch({ type: ActionTypes.SUCCESS, payload: cache[url] });
        return;
      }

      try {
        const response = await fetch(url, options);

        const data = (await response.json()) as T;
        if (cache) cache[url] = data;

        dispatch({ type: ActionTypes.SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: ActionTypes.ERROR, payload: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
};
