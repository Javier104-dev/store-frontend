import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IStoreNormalized extends IBaseEntity {
  id: string;
  name: string;
}
