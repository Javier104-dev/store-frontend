import type { ICartItemNormalized } from '@/features/cart/interfaces/types/ICartItemNormalized';
import type { ICartItemResponse } from '@/features/cart/interfaces/types/ICartItemResponse';
import { mapProduct } from '@/features/product/mapper/product-mapper';

export const mapCartItem = (data: ICartItemNormalized): ICartItemResponse => ({
  id: data.id,
  quantity: data.quantity,
  unitPrice: Number.parseFloat(data.unitPrice),
  product: mapProduct(data.product),
});
