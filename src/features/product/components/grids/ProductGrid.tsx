import ProductCard from '@/features/product/components/cards/ProductCard';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import useResponsiveGrid from '@/hooks/grid/useResponsiveGrid';

type PropTypes = {
  products: IProduct[];
};

const ProductGrid = ({ products }: PropTypes) => {
  const { containerRef, count } = useResponsiveGrid();

  const getVisibleProductCount = (columns: number) => {
    return columns === 2 ? 4 : columns;
  };

  return (
    <div
      ref={containerRef}
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
      }}
    >
      {products.slice(0, getVisibleProductCount(count)).map((product) => (
        <ProductCard
          key={product.id}
          height={175}
          id={product.id}
          name={product.name}
          price={product.price}
          url={product?.upload[0]?.url}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
