import useSWR from "swr";
import { fetcher } from "./index";

export const useCareersList = () => {
    const { data, error, mutate } = useSWR("/careers", fetcher);
    console.log("data", data);
    return {
        careers: data && data.data,
        links: data && data.links,
        meta: data && data.meta,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};