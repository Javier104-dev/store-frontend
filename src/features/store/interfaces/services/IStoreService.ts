import type { ICreateStore } from '@/features/store/interfaces/api/request/ICreateStore';
import type { IUpdateStore } from '@/features/store/interfaces/api/request/IUpdateStore';
import type { IStore } from '@/features/store/interfaces/types/IStore';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IStoreService {
  getStoreFronOwner(config?: ApiRequestConfig): Promise<IStore>;
  createStore(
    createStore: ICreateStore,
    config?: ApiRequestConfig,
  ): Promise<void>;
  updateStore(
    updateStore: IUpdateStore,
    config?: ApiRequestConfig,
  ): Promise<void>;
}
