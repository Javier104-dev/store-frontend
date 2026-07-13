import type { ICreateProduct } from '@/features/catalog/interfaces/api/request/ICreateProduct';

export interface IUpdateProduct extends ICreateProduct {
  id?: string;
  uploadIds?: string[];
}
