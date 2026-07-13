import type { CartStatus } from '@/features/cart/constants/cart-status';
import type { ICartItemResponse } from '@/features/cart/interfaces/types/ICartItemResponse';

export interface ICart {
  id: string;
  status: CartStatus;
  items: ICartItemResponse[];
}
