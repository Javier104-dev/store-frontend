import type { ICreateStore } from '@/features/store/interfaces/api/request/ICreateStore';
import type { IUpdateStore } from '@/features/store/interfaces/api/request/IUpdateStore';
import type { IStoreAttributes } from '@/features/store/interfaces/api/response/IStoreAttributes';
import type { IStoreService } from '@/features/store/interfaces/services/IStoreService';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class StoreService implements IStoreService {
  async getStoreFronOwner(
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IStoreAttributes>> {
    return apiService.get<ISingleResponse<IStoreAttributes>>(
      '/store/owner',
      config,
    );
  }

  async createStore(
    createStore: ICreateStore,
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IStoreAttributes>> {
    return apiService.post<ISingleResponse<IStoreAttributes>>(
      '/store',
      createStore,
      config,
    );
  }

  async updateStore(
    updateStore: IUpdateStore,
    config?: ApiRequestConfig,
  ): Promise<ISingleResponse<IStoreAttributes>> {
    return apiService.patch<ISingleResponse<IStoreAttributes>>(
      '/store',
      updateStore,
      config,
    );
  }
}

export const storeService = new StoreService();
