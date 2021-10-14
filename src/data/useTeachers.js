import useSWR from "swr";
import { fetcher } from "./index";

export const useTeachers = () => {
  const { data, error, mutate } = useSWR("/teachers", fetcher);

  return {
    teachers: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
