import AdminProductCard from '@/features/product/components/cards/AdminProductCard';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';

type PropTypes = {
  products: IProduct[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  disabled: boolean;
  selectedProductId?: string;
};

const AllProductsGrid = ({
  products,
  onDelete,
  onEdit,
  disabled,
  selectedProductId,
}: PropTypes) => {
  const showSpinner = (productId: string, selectedProductId?: string) =>
    productId === selectedProductId;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((product) => (
        <AdminProductCard
          key={product.id}
          height={175}
          product={product}
          onDelete={() => onDelete(product.id)}
          onEdit={() => onEdit(product.id)}
          disabled={disabled}
          showSpinner={showSpinner(product.id, selectedProductId)}
        />
      ))}
    </div>
  );
};

export default AllProductsGrid;
