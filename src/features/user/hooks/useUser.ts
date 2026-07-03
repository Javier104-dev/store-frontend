import {
  type QueryKey,
  type UseQueryOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { UserQueryKeys } from '@/features/user/constants/user.queryKeys';
import type { IUser } from '@/features/user/interfaces/types/IUser';
import { userService } from '@/features/user/services/user.service';

type ICustomQueryOptions = Omit<
  UseQueryOptions<IUser, Error, IUser, QueryKey>,
  'queryKey' | 'queryFn' | 'refetchOnWindowFocus' | 'initialData'
>;

export const useUser = (options?: ICustomQueryOptions) => {
  const queryClient = useQueryClient();
  const ONE_HOUR = 1000 * 60 * 60;

  const {
    data: userInfo,
    isLoading,
    refetch,
    ...rest
  } = useQuery<IUser, Error>({
    queryKey: [UserQueryKeys.getMe],
    queryFn: () => userService.getMe(),
    refetchOnWindowFocus: false,
    initialData:
      queryClient.getQueryData<IUser>([UserQueryKeys.getMe]) ?? undefined,
    staleTime: ONE_HOUR,
    ...options,
  });

  return { userInfo, isLoading, refetch, ...rest };
};
