import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { IUpload } from '@/features/product/interfaces/types/IUpload';

export interface IProduct extends IProductAttributes {
	id: string;
	categories: ICategory[];
	upload: IUpload[];
}
