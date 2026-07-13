import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { IUpload } from '@/features/product/interfaces/types/IUpload';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  categories: ICategory[];
  upload: IUpload[];
}
