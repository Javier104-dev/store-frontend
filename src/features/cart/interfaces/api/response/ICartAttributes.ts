import type { CartStatus } from '@/features/cart/constants/cart-status';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface ICartAttributes extends IBaseEntity {
  status: CartStatus;
}
