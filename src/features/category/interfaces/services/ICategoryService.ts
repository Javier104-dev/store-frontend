import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { ApiRequestConfig } from '@/services/api.service';

export interface ICategoryService {
  getCategories(config?: ApiRequestConfig): Promise<ICategory[]>;
}
