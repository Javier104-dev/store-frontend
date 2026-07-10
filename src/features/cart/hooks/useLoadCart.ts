import { useEffect } from 'react';

import { CartQueryKeys } from '@/features/cart/constants/cart.queryKeys';
import { useCartStore } from '@/features/cart/hooks/useCart';
import { cartService } from '@/features/cart/services/cart.service';
import useGet from '@/hooks/query/useGet';

const useLoadCart = (connected: boolean) => {
  const setItems = useCartStore((state) => state.setItems);

  const { data } = useGet({
    queryKey: [CartQueryKeys.getActiveCart],
    queryFn: () => cartService.getActiveCart(),
    enabled: connected,
  });

  useEffect(() => {
    if (data) {
      const mappedItems = data?.items?.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.unitPrice,
        img: item.product.upload[0]?.url,
      }));
      setItems(mappedItems);
    }
  }, [data, setItems]);
};

export default useLoadCart;
