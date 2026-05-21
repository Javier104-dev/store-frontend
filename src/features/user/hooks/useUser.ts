import {
	QueryKey,
	UseQueryOptions,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

import { UserQueryKeys } from '@/features/user/constants/user.queryKeys';
import { IUserAttributes } from '@/features/user/interfaces/api/response/IUserAttributes';
import { IUser } from '@/features/user/interfaces/types/IUser';
import { userService } from '@/features/user/services/user.service';
import { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

type ICustomQueryOptions = Omit<
	UseQueryOptions<ISingleResponse<IUserAttributes>, Error, IUser, QueryKey>,
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
	} = useQuery<ISingleResponse<IUserAttributes>, Error, IUser>({
		queryKey: [UserQueryKeys.getMe],
		queryFn: () => userService.getMe(),
		refetchOnWindowFocus: false,
		initialData:
			queryClient.getQueryData<ISingleResponse<IUserAttributes>>([
				UserQueryKeys.getMe,
			]) ?? undefined,
		staleTime: ONE_HOUR,
		select: normalizeJsonApiItem,
		...options,
	});

	return { userInfo, isLoading, refetch, ...rest };
};
