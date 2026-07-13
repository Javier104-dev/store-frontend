export const CART_STATUS = {
  ACTIVE: 'active',
  CONVERTED: 'completed',
  ABANDONED: 'abandoned',
} as const;

export type CartStatus = (typeof CART_STATUS)[keyof typeof CART_STATUS];
