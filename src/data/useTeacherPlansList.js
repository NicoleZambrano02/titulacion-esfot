import useSWR from "swr";
import { fetcher } from "./index";

export const useTeachersPlansList = () => {
  const { data, error, mutate } = useSWR("/teacher/ideas", fetcher);

  return {
    teacher_ideas: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
