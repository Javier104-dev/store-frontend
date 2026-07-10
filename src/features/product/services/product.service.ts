import type { ProductFilter } from '@/features/product/interfaces/api/request/ProductFilter';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { IProductService } from '@/features/product/interfaces/services/IProductService';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import type { IProductNormalized } from '@/features/product/interfaces/types/IProductNormalized';
import { mapProduct } from '@/features/product/mapper/product-mapper';
import type {
  IListResponse,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import {
  normalizeJsonApiItem,
  normalizeJsonApiList,
} from '@/utils/jsonApi-normalizer';

class ProductService implements IProductService {
  async getProductById(
    id: string,
    config?: ApiRequestConfig,
  ): Promise<IProduct> {
    const response = await apiService.get<ISingleResponse<IProductAttributes>>(
      `/product/${id}`,
      config,
    );
    return mapProduct(
      normalizeJsonApiItem<IProductAttributes, IProductNormalized>(response),
    );
  }

  async getProducts(
    productFilter?: ProductFilter,
    config?: ApiRequestConfig,
  ): Promise<IProduct[]> {
    const { categoryId, storeId } = productFilter || {};

    const filter = {
      ...(categoryId && { categories: { id: categoryId } }),
      ...(storeId && { store: { id: storeId } }),
    };

    const response = await apiService.get<IListResponse<IProductAttributes>>(
      '/product',
      {
        ...config,
        params: { filter },
      },
    );

    return normalizeJsonApiList<IProductAttributes, IProductNormalized>(
      response,
    ).map(mapProduct);
  }

  async getProductsFromOwner(config?: ApiRequestConfig): Promise<IProduct[]> {
    const response = await apiService.get<IListResponse<IProductAttributes>>(
      '/product/owner',
      config,
    );
    return normalizeJsonApiList<IProductAttributes, IProductNormalized>(
      response,
    ).map(mapProduct);
  }

  async deleteProduct(id: string, config?: ApiRequestConfig): Promise<void> {
    await apiService.delete(`/product/${id}`, config);
  }
}

export const productService = new ProductService();
