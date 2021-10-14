import useSWR from "swr";
import { fetcher } from "./index";

export const useTeachersIdeasList = () => {
  const { data, error, mutate } = useSWR("/teachers-ideas", fetcher);

  return {
    ideas: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
