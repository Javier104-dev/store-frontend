import type { ICategoryNormalized } from '@/features/category/interfaces/types/ICategoryNormalized';
import type { IUploadNormalized } from '@/features/product/interfaces/types/IUploadNormalized';
import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IProductNormalized extends IBaseEntity {
  id: string;
  name: string;
  price: string;
  description: string;
  categories?: ICategoryNormalized[];
  upload?: IUploadNormalized[];
}
