import type { IUserAttributes } from '@/features/user/interfaces/api/response/IUserAttributes';
import type { IUserCountAttributes } from '@/features/user/interfaces/api/response/IUserCountAttributes';
import type { IUserService } from '@/features/user/interfaces/services/IUserService';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class UserService implements IUserService {
	async getMe(
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IUserAttributes>> {
		return apiService.get<ISingleResponse<IUserAttributes>>('/user/me', config);
	}

	async getUsersCount(): Promise<ISingleResponse<IUserCountAttributes>> {
		return apiService.get<ISingleResponse<IUserCountAttributes>>('/user/count');
	}
}

export const userService = new UserService();
