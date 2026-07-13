import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IUploadNormalized extends IBaseEntity {
  id: string;
  key: string;
  url: string;
}
