type PropTypes = {
  decreaseQuantity: () => void;
  itemQuantity: number;
  increaseQuantity: () => void;
};

const QuantityStepper = ({
  decreaseQuantity,
  itemQuantity,
  increaseQuantity,
}: PropTypes) => {
  return (
    <div className="border rounded-md w-fit text-[20px] overflow-hidden">
      <button
        className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <span className="min-w-[3ch] text-center inline-block">
        {itemQuantity}
      </span>
      <button
        className="py-0.2 px-4 hover:bg-gray-200 cursor-pointer"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
