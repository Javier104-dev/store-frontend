import debounce from 'lodash/debounce';
import { useShallow } from 'zustand/react/shallow';

import { notifyError } from '@/errors/notify-error';
import { CartQueryKeys } from '@/features/cart/constants/cart.queryKeys';
import { useCartStore } from '@/features/cart/hooks/useCart';
import type { IUpdateCart } from '@/features/cart/interfaces/api/request/IUpdateCart';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import { cartService } from '@/features/cart/services/cart.service';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';

const useCartItemActions = (cartItem: ICartItem) => {
  const { invalidateQueryKey } = useInvalidateQueries();
  const { updateItemQuantity, removeItem } = useCartStore(
    useShallow(({ updateItemQuantity, removeItem }) => ({
      updateItemQuantity,
      removeItem,
    })),
  );

  const { mutate: syncQuantity } = useMutate<void, IUpdateCart>({
    mutationFn: (variables) =>
      cartService.updateCartItem(cartItem.id, {
        quantity: variables.quantity,
      }),
    onError: (error) => {
      notifyError(error);
      invalidateQueryKey(CartQueryKeys.getActiveCart);
    },
    onSuccess: () => {
      invalidateQueryKey(CartQueryKeys.getActiveCart);
    },
  });

  const { mutate: deleteItem } = useMutate<void, string>({
    mutationFn: (variables) => cartService.deleteCartItem(variables),
    onMutate: (cartItemId) => {
      removeItem(cartItemId);
    },
    onError: (error) => {
      notifyError(error);
      invalidateQueryKey(CartQueryKeys.getActiveCart);
    },
    onSuccess: () => {
      invalidateQueryKey(CartQueryKeys.getActiveCart);
    },
  });

  const debouncedSync = debounce(
    (quantity: number) => syncQuantity({ quantity }),
    400,
  );

  const handleDecreaseQuantity = () => {
    const newQuantity = Math.max(1, cartItem.quantity - 1);
    updateItemQuantity(cartItem.id, newQuantity);
    debouncedSync(newQuantity);
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = cartItem.quantity + 1;
    updateItemQuantity(cartItem.id, newQuantity);
    debouncedSync(newQuantity);
  };

  const handleDeleteItem = () => {
    deleteItem(cartItem.id);
  };

  return { handleDecreaseQuantity, handleIncreaseQuantity, handleDeleteItem };
};

export default useCartItemActions;
