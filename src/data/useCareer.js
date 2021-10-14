import useSWR from 'swr';
import {fetcher} from './index';

export const useCareer = (id)=>{
  const {data, error, mutate} = useSWR(()=>`/careers/${id}`, fetcher);

  return {
    career: data && data.data,
    isLoading: !data && !error,
    isError: error,
    mutate
  }
}
