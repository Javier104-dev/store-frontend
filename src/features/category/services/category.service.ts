import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { ICategoryService } from '@/features/category/interfaces/services/ICategoryService';
import type { IListResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class CategoryService implements ICategoryService {
	async getCategories(
		config?: ApiRequestConfig,
	): Promise<IListResponse<ICategoryAttributes>> {
		return apiService.get<IListResponse<ICategoryAttributes>>('/category', {
			...config,
			params: { page: { size: 25 } },
		});
	}
}

export const categoryService = new CategoryService();
