import type { ICreateProductVariables } from '@/features/catalog/interfaces/api/request/ICreateProductVariables';
import type { IUpdateProductVariables } from '@/features/catalog/interfaces/api/request/IUpdateProductVariables';
import type { ICatalogService } from '@/features/catalog/interfaces/services/ICatalogService';
import { buildFormData } from '@/features/catalog/utils/buildFormData';
import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { ICategoryNormalized } from '@/features/category/interfaces/types/ICategoryNormalized';
import { mapCategory } from '@/features/category/mapper/category-mapper';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type {
  IListResponse,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import { normalizeJsonApiList } from '@/utils/jsonApi-normalizer';

class CatalogService implements ICatalogService {
  async getCategoriesWithProducts(
    config?: ApiRequestConfig,
  ): Promise<ICategory[]> {
    const response = await apiService.get<IListResponse<ICategoryAttributes>>(
      '/catalog/categories',
      config,
    );
    return normalizeJsonApiList<ICategoryAttributes, ICategoryNormalized>(
      response,
    ).map(mapCategory);
  }

  async createProduct(
    createProductVariables: ICreateProductVariables,
    config?: ApiRequestConfig,
  ): Promise<void> {
    const { product, files } = createProductVariables;

    const formData = buildFormData(product, files);

    await apiService.post<ISingleResponse<IProductAttributes>>(
      '/catalog/product',
      formData,
      config,
    );
  }

  async updateProduct(
    updateProductVariables: IUpdateProductVariables,
    config?: ApiRequestConfig,
  ): Promise<void> {
    const {
      product: { id, ...rest },
      files,
    } = updateProductVariables;

    const formData = buildFormData(rest, files);

    await apiService.patch<ISingleResponse<IProductAttributes>>(
      `/catalog/product/${id}`,
      formData,
      config,
    );
  }
}

export const catalogService = new CatalogService();
