import type { IUpload } from '@/features/product/interfaces/types/IUpload';
import type { IUploadNormalized } from '@/features/product/interfaces/types/IUploadNormalized';

export const mapUpload = (data: IUploadNormalized): IUpload => ({
  id: data.id,
  url: data.url,
});
