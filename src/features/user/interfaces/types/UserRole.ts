export const USER_ROLES = {
  REGULAR: 'regular',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
