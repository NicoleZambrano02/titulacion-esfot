import useSWR from "swr";
import { fetcher } from "./index";

export const useProjects = () => {
  const { data, error, mutate } = useSWR("/projects", fetcher);

  return {
    projectsList: data && data.data,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
