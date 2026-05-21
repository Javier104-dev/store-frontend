import type { IUserAttributes } from '@/features/user/interfaces/api/response/IUserAttributes';
import type { IUserCountAttributes } from '@/features/user/interfaces/api/response/IUserCountAttributes';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IUserService {
	getMe(config?: ApiRequestConfig): Promise<ISingleResponse<IUserAttributes>>;
	getUsersCount(): Promise<ISingleResponse<IUserCountAttributes>>;
}
