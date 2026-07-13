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
      >
        -
      </button>
      <span className="min-w-[3ch] text-center inline-block">
        {itemQuantity}
      </span>
      <button
        className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
        onClick={handleIncreaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
