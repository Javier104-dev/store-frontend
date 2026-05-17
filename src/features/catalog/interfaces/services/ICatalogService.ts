import type { ICreateProductVariables } from '@/features/catalog/interfaces/api/request/ICreateProductVariables';
import type { IUpdateProductVariables } from '@/features/catalog/interfaces/api/request/IUpdateProductVariables';
import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type {
	IListResponse,
	ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface ICatalogService {
	getCategoriesWithProducts(
		config?: ApiRequestConfig,
	): Promise<IListResponse<ICategoryAttributes>>;
	createProduct(
		createProductVariables: ICreateProductVariables,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IProductAttributes>>;
	updateProduct(
		updateProductVariables: IUpdateProductVariables,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IProductAttributes>>;
}
