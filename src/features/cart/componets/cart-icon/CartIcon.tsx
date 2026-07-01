import { FiShoppingCart } from 'react-icons/fi';

import { useCartStore } from '@/features/cart/hooks/useCart';

type PropTypes = {
  isSticky: boolean;
};

const CartIcon = ({ isSticky }: PropTypes) => {
  const { items, openCart } = useCartStore();

  return (
    <button onClick={openCart} className="relative w-fit cursor-pointer">
      <div
        className={`transition-all duration-500 ${isSticky ? 'w-6 h-6' : 'w-7 h-7'}`}
      >
        <FiShoppingCart className="w-full h-full" />
      </div>
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
