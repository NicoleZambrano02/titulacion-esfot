/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from "swr";
import { fetcher } from "./index";

export const useArticleComments = (id) => {
  const { data, error, mutate } = useSWR(
    () => `/articles/${id}/comments`,
    fetcher
  );
  return {
    comments: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
