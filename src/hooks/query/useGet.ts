import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseGetOptions<TData> {
  queryKey: (string | undefined)[];
  queryFn: () => Promise<TData>;
  enabled?: boolean;
}

const useGet = <TData>(
  options: UseGetOptions<TData>,
): UseQueryResult<TData, AxiosError> => {
  const { queryKey, queryFn, enabled = true } = options;
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn,
    enabled,
  });
};

export default useGet;
