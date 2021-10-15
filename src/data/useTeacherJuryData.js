import useSWR from "swr";
import { fetcher } from "./index";

export const useTeacherJuryData = (planId, teacherId) => {
  const { data, error, mutate } = useSWR(
    `/projects/${planId}/jury/${teacherId}`,
    fetcher
  );

  return {
    teacherJuryData: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
