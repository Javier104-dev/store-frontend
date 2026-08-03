import type { ICreateCartItem } from '@/features/cart/interfaces/api/request/ICreateCartItem';
import type { IUpdateCart } from '@/features/cart/interfaces/api/request/IUpdateCart';
import type { ICartAttributes } from '@/features/cart/interfaces/api/response/ICartAttributes';
import type { ICartService } from '@/features/cart/interfaces/services/ICartService';
import type { ICart } from '@/features/cart/interfaces/types/ICart';
import type { ICartNormalized } from '@/features/cart/interfaces/types/ICartNormalized';
import { mapCart } from '@/features/cart/mapper/cart-mapper';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

class CartService implements ICartService {
  async getActiveCart(config?: ApiRequestConfig): Promise<ICart> {
    const reponse = await apiService.get<ISingleResponse<ICartAttributes>>(
      '/cart/user',
      config,
    );
    return mapCart(
      normalizeJsonApiItem<ICartAttributes, ICartNormalized>(reponse),
    );
  }

  async createCartItem(
    createCartItem: ICreateCartItem,
    config?: ApiRequestConfig,
  ): Promise<void> {
    await apiService.post<ISingleResponse<ICartAttributes>>(
      '/cart/item',
      createCartItem,
      config,
    );
  }

  async updateCartItem(
    cartId: string,
    updateCartItem: IUpdateCart,
    config?: ApiRequestConfig,
  ): Promise<void> {
    await apiService.patch<ISingleResponse<ICartAttributes>>(
      `/cart/item/${cartId}`,
      updateCartItem,
      config,
    );
  }

  async deleteCartItem(cartItemId: string): Promise<void> {
    await apiService.delete<void>(`/cart/item/${cartItemId}`);
  }
}

export const cartService = new CartService();
