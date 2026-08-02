import type { IUserAttributes } from '@/features/user/interfaces/api/response/IUserAttributes';
import type { IUserCountAttributes } from '@/features/user/interfaces/api/response/IUserCountAttributes';
import type { IUserService } from '@/features/user/interfaces/services/IUserService';
import type { IUSerNormalized } from '@/features/user/interfaces/types/IUSerNormalized';
import type { IUser } from '@/features/user/interfaces/types/IUser';
import type { UserCount } from '@/features/user/interfaces/types/UserCount';
import { mapUser } from '@/features/user/mapper/user-mapper';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

class UserService implements IUserService {
  async getMe(config?: ApiRequestConfig): Promise<IUser> {
    const response = await apiService.get<ISingleResponse<IUserAttributes>>(
      '/user/me',
      config,
    );
    return mapUser(
      normalizeJsonApiItem<IUserAttributes, IUSerNormalized>(response),
    );
  }

  async getUsersCount(): Promise<UserCount> {
    const response =
      await apiService.get<ISingleResponse<IUserCountAttributes>>(
        '/user/count',
      );
    return normalizeJsonApiItem<IUserCountAttributes, UserCount>(response);
  }
}

export const userService = new UserService();
