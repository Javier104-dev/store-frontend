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
    <div
      className="flex items-center gap-3 py-7"
      data-test={`cart-item-${item.id}`}
    >
      <ProductImage height={90} width={90} url={item.img} />
      <div className="flex-1">
        <div className="mb-4">
          <h1 className="font-bold">{item.name}</h1>
          <span data-test="cart-item-price">$ {item.price.toFixed(2)}</span>
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
            data-test="delete-cart-item-button"
          >
            <BiSolidTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
