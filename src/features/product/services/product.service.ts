import type { ProductFilter } from '@/features/product/interfaces/api/request/ProductFilter';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { IProductService } from '@/features/product/interfaces/services/IProductService';
import type {
	IListResponse,
	ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class ProductService implements IProductService {
	async getProductById(
		id: string,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IProductAttributes>> {
		return apiService.get<ISingleResponse<IProductAttributes>>(
			`/product/${id}`,
			config,
		);
	}

	async getProducts(
		productFilter?: ProductFilter,
		config?: ApiRequestConfig,
	): Promise<IListResponse<IProductAttributes>> {
		const { categoryId, storeId } = productFilter || {};

		const filter = {
			...(categoryId && { categories: { id: categoryId } }),
			...(storeId && { store: { id: storeId } }),
		};

		return apiService.get<IListResponse<IProductAttributes>>('/product', {
			...config,
			params: { filter },
		});
	}

	async getProductsFromOwner(
		config?: ApiRequestConfig,
	): Promise<IListResponse<IProductAttributes>> {
		return apiService.get<IListResponse<IProductAttributes>>(
			'/product/owner',
			config,
		);
	}

	async deleteProduct(id: string, config?: ApiRequestConfig): Promise<void> {
		return apiService.delete(`/product/${id}`, config);
	}
}

export const productService = new ProductService();
