import CartDrawerContent from '@/features/cart/componets/cart-drawer/CartDrawerContent';
import { useCartStore } from '@/features/cart/hooks/useCart';
import { calculateSubtotal } from '@/features/cart/utils/cart-utils';

const CartDrawer = () => {
  const {
    items,
    isOpen,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    closeCart,
  } = useCartStore();

  return (
    <div>
      <button
        onClick={closeCart}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
      <div
        className={`fixed inset-y-0 right-0 h-full w-auto bg-white z-50
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <CartDrawerContent
          cartItems={items}
          removeItem={removeItem}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          total={calculateSubtotal(items).toFixed(2)}
        />
      </div>
    </div>
  );
};

export default CartDrawer;
