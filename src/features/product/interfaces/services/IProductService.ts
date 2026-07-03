import type { ProductFilter } from '@/features/product/interfaces/api/request/ProductFilter';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IProductService {
  getProductById(id: string, config?: ApiRequestConfig): Promise<IProduct>;
  getProducts(
    productFilter?: ProductFilter,
    config?: ApiRequestConfig,
  ): Promise<IProduct[]>;
  getProductsFromOwner(config?: ApiRequestConfig): Promise<IProduct[]>;
  deleteProduct(id: string, config?: ApiRequestConfig): Promise<void>;
}
