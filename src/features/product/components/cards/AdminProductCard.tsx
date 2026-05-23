import ProductImageWithActions from '@/features/product/components/ui/ProductImageWithActions ';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';

type PropTypes = {
  height: number;
  product: IProduct;
  onDelete: () => void;
  onEdit: () => void;
  disabled: boolean;
  showSpinner: boolean;
};

const AdminProductCard = ({
  height,
  product,
  onDelete,
  onEdit,
  disabled,
  showSpinner,
}: PropTypes) => {
  return (
    <div data-test={`admin-product-card-${product.id}`}>
      <ProductImageWithActions
        height={height}
        onDelete={onDelete}
        onEdit={onEdit}
        disabled={disabled}
        showSpinner={showSpinner}
        url={product?.upload[0]?.url}
      />
      <div className="mt-2">
        <h1 className="text-[14px]">{product.name}</h1>
        <p className="font-bold text-[16px]">$ {product.price}</p>
        <p className="text-[14px]">#{product.id}</p>
      </div>
    </div>
  );
};

export default AdminProductCard;
