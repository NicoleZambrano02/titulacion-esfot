import useSWR from "swr";
import { fetcher } from "./index";

export const usePlanContent = (id) => {
  const { data, error, mutate } = useSWR(() => `/projects/${id}`, fetcher);
  return {
    plan: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
