import useSWR from "swr";
import { fetcher } from "./index";

export const useCommissionsList = () => {
  const { data, error, mutate } = useSWR("/commissions", fetcher);

  return {
    commissions: data && data.data,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
