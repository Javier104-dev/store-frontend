import type { ICartItemNormalized } from '@/features/cart/interfaces/types/ICartItemNormalized';
import type { ICartItemResponse } from '@/features/cart/interfaces/types/ICartItemResponse';
import { mapProduct } from '@/features/product/mapper/product-mapper';
import { sanitizeNumber } from '@/utils/price-format';

export const mapCartItem = (data: ICartItemNormalized): ICartItemResponse => ({
  id: data.id,
  quantity: data.quantity,
  unitPrice: sanitizeNumber(Number.parseFloat(data.unitPrice)),
  product: mapProduct(data.product),
});
