import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseGetOptions<TQueryFnData, TData> {
	queryKey: (string | undefined)[];
	queryFn: () => Promise<TQueryFnData>;
	enabled?: boolean;
	select?: (data: TQueryFnData) => TData;
}

const useGet = <TQueryFnData, TData>(
	options: UseGetOptions<TQueryFnData, TData>,
): UseQueryResult<TData, AxiosError> => {
	const { queryKey, queryFn, enabled = true, select } = options;

	return useQuery<TQueryFnData, AxiosError, TData>({
		queryKey,
		queryFn,
		enabled,
		select,
	});
};

export default useGet;
