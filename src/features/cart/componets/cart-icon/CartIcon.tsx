import { FiShoppingCart } from 'react-icons/fi';
import { useShallow } from 'zustand/react/shallow';

import { useCartStore } from '@/features/cart/hooks/useCart';
import { calculateTotalItems } from '@/features/cart/utils/cart-utils';

type PropTypes = {
  isSticky: boolean;
};

const CartIcon = ({ isSticky }: PropTypes) => {
  const { items, openCart } = useCartStore(
    useShallow(({ items, openCart }) => ({ items, openCart })),
  );

  return (
    <button
      onClick={openCart}
      className="relative w-fit cursor-pointer"
      data-test="cart-icon"
    >
      <div
        className={`transition-all duration-500 ${isSticky ? 'w-6 h-6' : 'w-7 h-7'}`}
      >
        <FiShoppingCart className="w-full h-full" />
      </div>
      {items.length > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          data-test="cart-icon-count"
        >
          {calculateTotalItems(items)}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
