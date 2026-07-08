import { BiSolidTrashAlt } from 'react-icons/bi';

import QuantityStepper from '@/components/ui/buttons/QuantityStepper';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import ProductImage from '@/features/product/components/ui/ProductImage';

type PropTypes = {
  item: ICartItem;
  decreaseQuantity: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  removeItem: (itemId: string) => void;
};

const CartItem = ({
  item,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
}: PropTypes) => {
  return (
    <div className="flex items-center gap-3 py-7">
      <ProductImage height={90} url={item.img} />
      <div className="w-full">
        <div className="mb-4">
          <h1 className="font-bold">{item.name}</h1>
          <p>$ {item.price.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <QuantityStepper
            decreaseQuantity={() => decreaseQuantity(item.id)}
            itemQuantity={item.quantity}
            increaseQuantity={() => increaseQuantity(item.id)}
          />
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
  );
};

export default CartItem;
