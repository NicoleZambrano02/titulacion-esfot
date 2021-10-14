import useSWR from "swr";
import { fetcher } from "./index";

export const useStudentProject = () => {
  const { data, error, mutate } = useSWR("/students/project", fetcher);

  return {
    projects: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
