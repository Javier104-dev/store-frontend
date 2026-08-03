import { useShallow } from 'zustand/react/shallow';

import CartDrawerContent from '@/features/cart/componets/cart-drawer/CartDrawerContent';
import { useCartStore } from '@/features/cart/hooks/useCart';

const CartDrawer = () => {
  const { items, isOpen, closeCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      isOpen: state.isOpen,
      closeCart: state.closeCart,
    })),
  );

  return (
    <div>
      <button
        onClick={closeCart}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-20
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        type="button"
        data-test="cart-drawer-overlay"
      />
      <div
        className={`fixed inset-y-0 right-0 h-full w-auto bg-white z-30
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        data-test="cart-drawer-content"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <CartDrawerContent cartItems={items} closeCart={closeCart} />
      </div>
    </div>
  );
};

export default CartDrawer;
