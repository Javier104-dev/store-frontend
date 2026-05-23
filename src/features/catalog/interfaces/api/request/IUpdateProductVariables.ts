import { IUpdateProduct } from '@/features/catalog/interfaces/api/request/IUpdateProduct';

export interface IUpdateProductVariables {
  product: IUpdateProduct;
  files: File[];
}
