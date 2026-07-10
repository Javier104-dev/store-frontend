import type { IProductNormalized } from '@/features/product/interfaces/types/IProductNormalized';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface ICartItemNormalized extends IBaseEntity {
  id: string;
  quantity: number;
  unitPrice: string;
  product: IProductNormalized;
}
