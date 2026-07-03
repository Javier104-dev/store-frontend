import type { IProduct } from '@/features/product/interfaces/types/IProduct';

export interface ICategory {
  id: string;
  name: string;
  products: IProduct[];
}
