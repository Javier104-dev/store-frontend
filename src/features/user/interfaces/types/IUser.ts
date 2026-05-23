import { IUserAttributes } from '@/features/user/interfaces/api/response/IUserAttributes';

export interface IUser extends IUserAttributes {
  id: string;
}
