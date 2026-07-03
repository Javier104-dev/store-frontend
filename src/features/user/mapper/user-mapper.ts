import type { IUSerNormalized } from '@/features/user/interfaces/types/IUSerNormalized';
import type { IUser } from '@/features/user/interfaces/types/IUser';

export const mapUser = (data: IUSerNormalized): IUser => ({
  roles: data.roles,
});
