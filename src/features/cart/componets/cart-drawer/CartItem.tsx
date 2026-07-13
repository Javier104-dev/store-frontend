import { BiSolidTrashAlt } from 'react-icons/bi';

import QuantityStepper from '@/components/ui/buttons/QuantityStepper';
import useCartItemActions from '@/features/cart/hooks/useCartItemActions';
import type { ICartItem } from '@/features/cart/interfaces/types/ICartItem';
import ProductImage from '@/features/product/components/ui/ProductImage';

type PropTypes = {
  item: ICartItem;
};

const CartItem = ({ item }: PropTypes) => {
  const { handleDecreaseQuantity, handleIncreaseQuantity, handleDeleteItem } =
    useCartItemActions(item);

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
            handleDecreaseQuantity={handleDecreaseQuantity}
            itemQuantity={item.quantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
          <button
            className="cursor-pointer"
            onClick={handleDeleteItem}
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
