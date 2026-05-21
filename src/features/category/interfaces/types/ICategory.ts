import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';

export interface ICategory extends ICategoryAttributes {
	id: string;
	products: IProduct[];
}
