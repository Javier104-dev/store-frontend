import CloseButton from '@/components/ui/buttons/CloseButton';
import CartItem from '@/features/cart/componets/cart-drawer/CartItem';
import CartSubTotal from '@/features/cart/componets/cart-drawer/CartSubTotal';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import {
  calculateSubtotal,
  calculateTotalItems,
} from '@/features/cart/utils/cart-utils';

type PropTypes = {
  cartItems: ICartItem[];
  closeCart: () => void;
};

const CartDrawerContent = ({ cartItems, closeCart }: PropTypes) => {
  const subTotal = calculateSubtotal(cartItems);
  const totalItems = calculateTotalItems(cartItems);

  return (
    <div className="w-87.5">
      <div className="flex justify-between items-center py-5 px-6 border-b border-gray-200">
        <h1 className="font-bold">{`Tu carrito (${totalItems})`}</h1>
        <CloseButton onClose={closeCart} />
      </div>
      <div className="divide-y divide-gray-200 px-6">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSubTotal subTotal={subTotal} />
    </div>
  );
};

export default CartDrawerContent;
