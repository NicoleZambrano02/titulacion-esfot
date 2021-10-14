import useSWR from "swr";
import { fetcher } from "./index";

export const useStudentsList = () => {
  const { data, error, mutate } = useSWR("/students", fetcher);
  console.log("data", data);
  return {
    students: data && data.data,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
