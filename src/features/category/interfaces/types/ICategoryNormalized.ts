import type { IProductNormalized } from '@/features/product/interfaces/types/IProductNormalized';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface ICategoryNormalized extends IBaseEntity {
  id: string;
  name: string;
  products?: IProductNormalized[];
}
