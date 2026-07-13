import type { IStore } from '@/features/store/interfaces/types/IStore';
import type { IStoreNormalized } from '@/features/store/interfaces/types/IStoreNormalized';

export const mapStore = (data: IStoreNormalized): IStore => ({
  id: data.id,
  name: data.name,
});
