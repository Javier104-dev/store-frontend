import { ICreateProduct } from '@/features/catalog/interfaces/api/request/ICreateProduct';

export interface ICreateProductVariables {
  product: ICreateProduct;
  files: File[];
}
