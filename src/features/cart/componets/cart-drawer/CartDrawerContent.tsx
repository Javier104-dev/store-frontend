import { BiSolidTrashAlt } from 'react-icons/bi';

import Button from '@/components/ui/buttons/Button';
import CloseButton from '@/components/ui/buttons/CloseButton';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import ProductImage from '@/features/product/components/ui/ProductImage';

type PropTypes = {
  cartItems: ICartItem[];
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  total: string;
};

const CartDrawerContent = ({
  cartItems,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  total,
}: PropTypes) => {
  return (
    <div className="w-87.5">
      <div className="flex justify-between items-center py-5 px-6 border-b border-gray-200">
        <h1 className="font-bold">Tu carrito</h1>
        <CloseButton onClose={() => {}} />
      </div>
      <div className="divide-y divide-gray-200 px-6">
        {cartItems.map((item) => (
          <div className="flex items-center gap-3 py-7" key={item.id}>
            <ProductImage height={90} url={item.img} />
            <div className="w-full">
              <div className="mb-4">
                <h1 className="font-bold">{item.name}</h1>
                <p>$ {item.price}</p>
              </div>
              <div className="flex justify-between">
                <div className="border rounded-md w-fit text-[20px] overflow-hidden">
                  <button
                    className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="py-0.2 px-3 ">{item.quantity}</span>
                  <button
                    className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="cursor-pointer"
                  onClick={() => removeItem(item.id)}
                  type="button"
                >
                  <BiSolidTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 py-5 px-6">
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span>$ {total}</span>
        </div>
        <Button innerText={'Ir al checkout'} colorFill={true} />
      </div>
    </div>
  );
};

export default CartDrawerContent;
