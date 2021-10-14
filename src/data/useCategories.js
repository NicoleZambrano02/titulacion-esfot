/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from "swr";
import { fetcher } from "./index";

export const useCategories = () => {
  const { data, error } = useSWR(`/categories`, fetcher);

  return {
    categories: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
