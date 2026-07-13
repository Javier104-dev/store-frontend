import { useShallow } from 'zustand/react/shallow';

import { CartQueryKeys } from '@/features/cart/constants/cart.queryKeys';
import { useCartStore } from '@/features/cart/hooks/useCart';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import { cartService } from '@/features/cart/services/cart.service';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';

const useAddCartItem = () => {
  const { addItem, removeItem } = useCartStore(
    useShallow(({ addItem, removeItem }) => ({
      addItem,
      removeItem,
    })),
  );

  const { invalidateQueryKey } = useInvalidateQueries();

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
    onSuccess: () => {
      invalidateQueryKey(CartQueryKeys.getActiveCart);
    },
  });
};

export default useAddCartItem;
