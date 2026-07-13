import type { UserRole } from '@/features/user/interfaces/types/UserRole';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IUserAttributes extends IBaseEntity {
  username: string;
  externalId: string;
  isVerified: boolean;
  roles: UserRole[];
}
