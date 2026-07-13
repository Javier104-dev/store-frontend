import type { ICreateCartItem } from '@/features/cart/interfaces/api/request/ICreateCartItem';
import type { IUpdateCart } from '@/features/cart/interfaces/api/request/IUpdateCart';
import type { ICart } from '@/features/cart/interfaces/types/ICart';
import type { ApiRequestConfig } from '@/services/api.service';

export interface ICartService {
  getActiveCart(config?: ApiRequestConfig): Promise<ICart>;
  createCartItem(
    createCartItem: ICreateCartItem,
    config?: ApiRequestConfig,
  ): Promise<void>;
  updateCartItem(
    cartId: string,
    updateCartItem: IUpdateCart,
    config?: ApiRequestConfig,
  ): Promise<void>;
  deleteCartItem(cartItemId: string): Promise<void>;
}
