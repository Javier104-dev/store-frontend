import type { ICreateProductVariables } from '@/features/catalog/interfaces/api/request/ICreateProductVariables';
import type { IUpdateProductVariables } from '@/features/catalog/interfaces/api/request/IUpdateProductVariables';
import type { ICatalogService } from '@/features/catalog/interfaces/services/ICatalogService';
import { buildFormData } from '@/features/catalog/utils/buildFormData';
import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type {
	IListResponse,
	ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class CatalogService implements ICatalogService {
	async getCategoriesWithProducts(
		config?: ApiRequestConfig,
	): Promise<IListResponse<ICategoryAttributes>> {
		return apiService.get<IListResponse<ICategoryAttributes>>(
			'/catalog/categories',
			config,
		);
	}

	async createProduct(
		createProductVariables: ICreateProductVariables,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IProductAttributes>> {
		const { product, files } = createProductVariables;

		const formData = buildFormData(product, files);

		return apiService.post<ISingleResponse<IProductAttributes>>(
			'/catalog/product',
			formData,
			config,
		);
	}

	async updateProduct(
		updateProductVariables: IUpdateProductVariables,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IProductAttributes>> {
		const {
			product: { id, ...rest },
			files,
		} = updateProductVariables;

		const formData = buildFormData(rest, files);

		return apiService.patch<ISingleResponse<IProductAttributes>>(
			`/catalog/product/${id}`,
			formData,
			config,
		);
	}
}

export const catalogService = new CatalogService();
