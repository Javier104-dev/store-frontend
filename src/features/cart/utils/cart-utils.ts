import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';

const sanitizeNumber = (value: number): number => {
  return Number.isFinite(value) ? value : 0;
};

const calculateLineTotal = (quantity: number, price: number): number => {
  return sanitizeNumber(quantity) * sanitizeNumber(price);
};

export const calculateSubtotal = (items: ICartItem[]): number => {
  return items.reduce(
    (sum, item) => sum + calculateLineTotal(item.quantity, item.price),
    0,
  );
};
