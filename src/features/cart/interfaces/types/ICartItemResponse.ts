import type { IProduct } from '@/features/product/interfaces/types/IProduct';

export interface ICartItemResponse {
  id: string;
  quantity: number;
  unitPrice: number;
  product: IProduct;
}
