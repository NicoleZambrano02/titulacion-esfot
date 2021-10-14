import useSWR from "swr";
import { fetcher } from "./index";

export const useJuries = () => {
    const { data, error, mutate } = useSWR("/juries", fetcher);
    console.log("data", data);
    return {
        juries: data && data.data,
        links: data && data.links,
        meta: data && data.meta,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};