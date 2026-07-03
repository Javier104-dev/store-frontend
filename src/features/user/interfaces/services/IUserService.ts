import type { IUserCountAttributes } from '@/features/user/interfaces/api/response/IUserCountAttributes';
import type { IUser } from '@/features/user/interfaces/types/IUser';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IUserService {
  getMe(config?: ApiRequestConfig): Promise<IUser>;
  getUsersCount(): Promise<ISingleResponse<IUserCountAttributes>>;
}
