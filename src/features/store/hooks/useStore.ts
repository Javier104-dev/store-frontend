import {
	type QueryKey,
	type UseQueryOptions,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { StoreQueryKeys } from '@/features/store/constants/store.queryKeys';
import type { IStoreAttributes } from '@/features/store/interfaces/api/response/IStoreAttributes';
import type { IStore } from '@/features/store/interfaces/types/IStore';
import { storeService } from '@/features/store/services/store.service';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

type ICustomQueryOptions = Omit<
	UseQueryOptions<ISingleResponse<IStoreAttributes>, Error, IStore, QueryKey>,
	'queryKey' | 'queryFn' | 'refetchOnWindowFocus' | 'initialData'
>;

export const useStore = (options?: ICustomQueryOptions) => {
	const queryClient = useQueryClient();
	const ONE_HOUR = 1000 * 60 * 60;

	const {
		data: storeInfo,
		isLoading,
		refetch,
		...rest
	} = useQuery<ISingleResponse<IStoreAttributes>, Error, IStore>({
		queryKey: [StoreQueryKeys.getStoreFronOwner],
		queryFn: () => storeService.getStoreFronOwner(),
		refetchOnWindowFocus: false,
		initialData:
			queryClient.getQueryData<ISingleResponse<IStoreAttributes>>([
				StoreQueryKeys.getStoreFronOwner,
			]) ?? undefined,
		staleTime: ONE_HOUR,
		select: normalizeJsonApiItem,
		...options,
	});

	return { storeInfo, isLoading, refetch, ...rest };
};
