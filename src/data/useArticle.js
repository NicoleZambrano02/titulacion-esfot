/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from "swr";
import { fetcher } from "./index";

export const useArticle = (id, options = {}) => {
  const { data, error } = useSWR(`/articles/${id}`, fetcher, options);

  return {
    article: data && data.data,
    isLoading: !error && !data,
    isError: error,
  };
};
