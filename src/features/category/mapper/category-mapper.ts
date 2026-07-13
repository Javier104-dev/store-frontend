import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import type { ICategoryNormalized } from '@/features/category/interfaces/types/ICategoryNormalized';
import { mapProduct } from '@/features/product/mapper/product-mapper';

export const mapCategory = (data: ICategoryNormalized): ICategory => ({
  id: data.id,
  name: data.name,
  products: (data.products ?? []).map(mapProduct),
});
