import Button from '@/components/ui/buttons/Button';
import QuantityStepper from '@/components/ui/buttons/QuantityStepper';

type PropTypes = {
  addItem: () => void;
  openCart: () => void;
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
  itemQuantity: number;
  isLoading: boolean;
};

const ProductActions = ({
  addItem,
  openCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  itemQuantity,
  isLoading,
}: PropTypes) => {
  return (
    <div className="flex flex-col gap-2 w-1/3">
      <QuantityStepper
        handleDecreaseQuantity={handleDecreaseQuantity}
        itemQuantity={itemQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
      />
      <Button
        colorFill={true}
        innerText="Add to cart"
        onClick={addItem}
        isLoading={isLoading}
        data-test="add-to-cart-button"
      />
      <Button colorFill={true} innerText="Buy now" onClick={openCart} />
    </div>
  );
};

export default ProductActions;
