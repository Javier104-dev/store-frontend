import Button from '@/components/ui/buttons/Button';
import QuantityStepper from '@/components/ui/buttons/QuantityStepper';

type PropTypes = {
  addItem: () => void;
  openCart: () => void;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  itemQuantity: number;
};

const ProductActions = ({
  addItem,
  openCart,
  decreaseQuantity,
  increaseQuantity,
  itemQuantity,
}: PropTypes) => {
  return (
    <div className="flex flex-col gap-2 w-1/3">
      <QuantityStepper
        decreaseQuantity={decreaseQuantity}
        itemQuantity={itemQuantity}
        increaseQuantity={increaseQuantity}
      />
      <Button
        colorFill={true}
        innerText="Agregar al carrito"
        onClick={addItem}
      />
      <Button colorFill={true} innerText="Comprar ahora" onClick={openCart} />
    </div>
  );
};

export default ProductActions;
