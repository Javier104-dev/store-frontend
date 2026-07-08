import Button from '@/components/ui/buttons/Button';

type PropTypes = {
  subTotal: number;
};

const CartSubTotal = ({ subTotal }: PropTypes) => {
  return (
    <div className="border-t border-gray-200 py-5 px-6">
      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span>$ {subTotal.toFixed(2)}</span>
      </div>
      <Button innerText={'Ir al checkout'} colorFill={true} />
    </div>
  );
};

export default CartSubTotal;
