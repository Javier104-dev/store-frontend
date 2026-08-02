import type { IUser } from '@/features/user/interfaces/types/IUser';
import type { UserCount } from '@/features/user/interfaces/types/UserCount';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IUserService {
  getMe(config?: ApiRequestConfig): Promise<IUser>;
  getUsersCount(): Promise<UserCount>;
}
