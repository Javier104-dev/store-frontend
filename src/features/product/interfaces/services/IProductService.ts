import type { ProductFilter } from '@/features/product/interfaces/api/request/ProductFilter';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type {
  IListResponse,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IProductService {
  getProductById(
    id: string,
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IProductAttributes>>;
  getProducts(
    productFilter?: ProductFilter,
    config?: ApiRequestConfig,
  ): Promise<IListResponse<IProductAttributes>>;
  getProductsFromOwner(
    config?: ApiRequestConfig,
  ): Promise<IListResponse<IProductAttributes>>;
  deleteProduct(id: string, config?: ApiRequestConfig): Promise<void>;
}
