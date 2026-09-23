import { HomeRoutes } from '@/configs/router/HomeRoutes';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import {
  USER_ROLES,
  type UserRole,
} from '@/features/user/interfaces/types/UserRole';

const getDefaultRouteForRole = (roles?: UserRole[]): string => {
  if (
    roles?.includes(USER_ROLES.ADMIN) ||
    roles?.includes(USER_ROLES.SUPERADMIN)
  ) {
    return StoreRoutes.MANAGE_PRODUCTS;
  }
  return HomeRoutes.HOME;
};

export default getDefaultRouteForRole;
