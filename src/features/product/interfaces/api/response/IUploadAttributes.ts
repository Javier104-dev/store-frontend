import type { IBaseEntity } from '@/interfaces/api/IBaseEntity';

export interface IUploadAttributes extends IBaseEntity {
  key: string;
  url: string;
}
