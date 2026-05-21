import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { IListResponse } from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface ICategoryService {
	getCategories(
		config?: ApiRequestConfig,
	): Promise<IListResponse<ICategoryAttributes>>;
}
