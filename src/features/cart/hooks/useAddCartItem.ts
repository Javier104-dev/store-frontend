import { useShallow } from 'zustand/react/shallow';

import { useCartStore } from '@/features/cart/hooks/useCart';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import { cartService } from '@/features/cart/services/cart.service';
import useMutate from '@/hooks/query/useMutate';

const useAddCartItem = () => {
  const { addItem, removeItem } = useCartStore(
    useShallow(({ addItem, removeItem }) => ({
      addItem,
      removeItem,
    })),
  );

  return useMutate<void, ICartItem>({
    mutationFn: (variables) =>
      cartService.createCartItem({
        productId: variables.id,
        quantity: variables.quantity,
      }),
    onMutate: (newItem) => {
      addItem(newItem);
    },
    onError: (_err, newItem) => removeItem(newItem.id),
  });
};

export default useAddCartItem;
