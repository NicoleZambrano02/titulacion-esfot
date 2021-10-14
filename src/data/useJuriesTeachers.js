import useSWR from "swr";
import { fetcher } from "./index";

export const useJuriesTeachers = (id) => {
  const { data, error, mutate } = useSWR(`/juriesTeachers/${id}`, fetcher);

  return {
    juriesTeachers: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
