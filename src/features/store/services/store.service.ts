import type { ICreateStore } from '@/features/store/interfaces/api/request/ICreateStore';
import type { IUpdateStore } from '@/features/store/interfaces/api/request/IUpdateStore';
import type { IStoreAttributes } from '@/features/store/interfaces/api/response/IStoreAttributes';
import type { IStoreService } from '@/features/store/interfaces/services/IStoreService';
import type { IStore } from '@/features/store/interfaces/types/IStore';
import type { IStoreNormalized } from '@/features/store/interfaces/types/IStoreNormalized';
import { mapStore } from '@/features/store/mapper/store-mapper';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

class StoreService implements IStoreService {
  async getStoreFronOwner(config?: ApiRequestConfig): Promise<IStore> {
    const response = await apiService.get<ISingleResponse<IStoreAttributes>>(
      '/store/owner',
      config,
    );
    return mapStore(
      normalizeJsonApiItem<IStoreAttributes, IStoreNormalized>(response),
    );
  }

  async createStore(
    createStore: ICreateStore,
    config?: ApiRequestConfig,
  ): Promise<void> {
    await apiService.post<ISingleResponse<IStoreAttributes>>(
      '/store',
      createStore,
      config,
    );
  }

  async updateStore(
    updateStore: IUpdateStore,
    config?: ApiRequestConfig,
  ): Promise<void> {
    await apiService.patch<ISingleResponse<IStoreAttributes>>(
      '/store',
      updateStore,
      config,
    );
  }
}

export const storeService = new StoreService();
