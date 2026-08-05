import { mapCategory } from '@/features/category/mapper/category-mapper';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import type { IProductNormalized } from '@/features/product/interfaces/types/IProductNormalized';
import { mapUpload } from '@/features/product/mapper/upload-mapper';
import { sanitizeNumber } from '@/utils/price-format';

export const mapProduct = (data: IProductNormalized): IProduct => ({
  id: data.id,
  name: data.name,
  price: sanitizeNumber(Number.parseFloat(data.price)),
  description: data.description,
  categories: (data.categories ?? []).map(mapCategory),
  upload: (data.upload ?? []).map(mapUpload),
});
