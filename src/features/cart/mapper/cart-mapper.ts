import type { ICart } from '@/features/cart/interfaces/types/ICart';
import type { ICartNormalized } from '@/features/cart/interfaces/types/ICartNormalized';
import { mapCartItem } from '@/features/cart/mapper/cart-item-mapper';

export const mapCart = (data: ICartNormalized): ICart => ({
  id: data.id,
  status: data.status,
  items: (data.items ?? []).map(mapCartItem),
});
