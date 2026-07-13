import {
  type QueryKey,
  type UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { StoreQueryKeys } from '@/features/store/constants/store.queryKeys';
import type { IStore } from '@/features/store/interfaces/types/IStore';
import { storeService } from '@/features/store/services/store.service';

type ICustomQueryOptions = Omit<
  UseQueryOptions<IStore, Error, IStore, QueryKey>,
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
  } = useQuery<IStore, Error>({
    queryKey: [StoreQueryKeys.getStoreFronOwner],
    queryFn: () => storeService.getStoreFronOwner(),
    refetchOnWindowFocus: false,
    initialData:
      queryClient.getQueryData<IStore>([StoreQueryKeys.getStoreFronOwner]) ??
      undefined,
    staleTime: ONE_HOUR,
    ...options,
  });

  return { storeInfo, isLoading, refetch, ...rest };
};
