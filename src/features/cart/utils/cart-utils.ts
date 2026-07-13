import Decimal from 'decimal.js';

import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';

const sanitizeNumber = (value: number): number => {
  return Number.isFinite(value) ? value : 0;
};

const calculateLineTotal = (quantity: number, price: number): number => {
  return new Decimal(sanitizeNumber(price))
    .times(sanitizeNumber(quantity))
    .toNumber();
};

export const calculateSubtotal = (items: ICartItem[]): number => {
  return items
    .reduce(
      (sum, item) => sum.plus(calculateLineTotal(item.quantity, item.price)),
      new Decimal(0),
    )
    .toNumber();
};

export const calculateTotalItems = (items: ICartItem[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};
