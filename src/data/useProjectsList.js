/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from "swr";
import { fetcher } from "./index";

export const useProjectsList = () => {
  const { data, error, mutate } = useSWR("/teacher-projects", fetcher);
  console.log("data", data);
  return {
    teachersProjects: data && data.data,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
