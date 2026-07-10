import type { CartStatus } from '@/features/cart/constants/cart-status';
import type { ICartItemNormalized } from '@/features/cart/interfaces/types/ICartItemNormalized';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface ICartNormalized extends IBaseEntity {
  id: string;
  status: CartStatus;
  items: ICartItemNormalized[];
}
