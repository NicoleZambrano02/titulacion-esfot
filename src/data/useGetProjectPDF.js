import useSWR from "swr";
import { fetcher } from "./index";

export const useGetProjectPDF = (id) => {
  const { data, error, mutate } = useSWR(
    () => `/project/getPDF/${id}`,
    fetcher
  );
  return {
    pdf: data && data.data,
    isLoading1: !error && !data,
    isError: error,
    mutate,
  };
};
