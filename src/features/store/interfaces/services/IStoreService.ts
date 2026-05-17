import type { IUpdateStore } from '@/features/store/interfaces/api/request/IUpdateStore';
import type { IStoreAttributes } from '@/features/store/interfaces/api/response/IStoreAttributes';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IStoreService {
	getStoreFronOwner(
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IStoreAttributes>>;
	updateStore(
		updateStore: IUpdateStore,
		config?: ApiRequestConfig,
	): Promise<ISingleResponse<IStoreAttributes>>;
}
