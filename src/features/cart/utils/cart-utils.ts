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
