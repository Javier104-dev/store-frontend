import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IProductAttributes extends IBaseEntity {
  name: string;
  price: number;
  description: string;
}
