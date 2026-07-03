import type { ICreateProductVariables } from '@/features/catalog/interfaces/api/request/ICreateProductVariables';
import type { IUpdateProductVariables } from '@/features/catalog/interfaces/api/request/IUpdateProductVariables';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface ICatalogService {
  getCategoriesWithProducts(config?: ApiRequestConfig): Promise<ICategory[]>;
  createProduct(
    createProductVariables: ICreateProductVariables,
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IProductAttributes>>;
  updateProduct(
    updateProductVariables: IUpdateProductVariables,
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IProductAttributes>>;
}
