import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { ICategoryService } from '@/features/category/interfaces/services/ICategoryService';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { ICategoryNormalized } from '@/features/category/interfaces/types/ICategoryNormalized';
import { mapCategory } from '@/features/category/mapper/category-mapper';
import type { IListResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import { normalizeJsonApiList } from '@/utils/jsonApi-normalizer';

class CategoryService implements ICategoryService {
  async getCategories(config?: ApiRequestConfig): Promise<ICategory[]> {
    const respose = await apiService.get<IListResponse<ICategoryAttributes>>(
      '/category',
      {
        ...config,
        params: { page: { size: 25 } },
      },
    );
    return normalizeJsonApiList<ICategoryAttributes, ICategoryNormalized>(
      respose,
    ).map(mapCategory);
  }
}

export const categoryService = new CategoryService();
