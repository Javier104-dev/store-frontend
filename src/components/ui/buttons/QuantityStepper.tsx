type PropTypes = {
  handleDecreaseQuantity: () => void;
  itemQuantity: number;
  handleIncreaseQuantity: () => void;
};

const QuantityStepper = ({
  handleDecreaseQuantity,
  itemQuantity,
  handleIncreaseQuantity,
}: PropTypes) => {
  return (
    <div className="border rounded-md w-fit text-[20px] overflow-hidden">
      <button
        className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
        onClick={handleDecreaseQuantity}
        data-test="decrease-quantity-button"
      >
        -
      </button>
      <span
        className="min-w-[3ch] text-center inline-block"
        data-test="cart-item-quantity"
      >
        {itemQuantity}
      </span>
      <button
        className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
        onClick={handleIncreaseQuantity}
        data-test="increase-quantity-button"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
