import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import VStack from '@/components/ui/layout/VStack';
import { useCartStore } from '@/features/cart/hooks/useCart';
import CategorySection from '@/features/category/components/sections/CategorySection';
import ProductActions from '@/features/product/components/ui/ProductActions';
import ProductImage from '@/features/product/components/ui/ProductImage';
import ProductInfo from '@/features/product/components/ui/ProductInfo';
import { ProductQueryKeys } from '@/features/product/constants/product.queryKeys';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import { productService } from '@/features/product/services/product.service';
import useGet from '@/hooks/query/useGet';

const ViewProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const { addItem, openCart } = useCartStore(
    useShallow(({ addItem, openCart }) => ({
      addItem,
      openCart,
    })),
  );
  const { id } = useParams<{ id: string }>();
  const productId = id ?? '';

  const { data: selectedProduct, isLoading } = useGet<IProduct>({
    queryKey: [ProductQueryKeys.getProductById, productId],
    queryFn: () => productService.getProductById(productId),
    enabled: Boolean(id),
  });

  const categoryId: string = selectedProduct?.categories?.[0]?.id ?? '';

  const { data: similarProducts, isLoading: similarProductsIsLoading } = useGet<
    IProduct[]
  >({
    queryKey: [ProductQueryKeys.getProductsByCategoryId, categoryId],
    queryFn: () => productService.getProducts({ categoryId }),
    enabled: Boolean(categoryId),
  });

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    console.log(quantity);

    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      quantity: quantity,
      price: selectedProduct.price,
      img: selectedProduct?.upload[0]?.url,
    });
  };

  return (
    <PageLayout>
      <VStack>
        {!selectedProduct && isLoading && <Spinner />}
        {selectedProduct && !isLoading && (
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div
              className="h-55 w-full md:h-40 md:w-62.5 lg:h-100 lg:w-140 shrink-0"
              data-test="product-image"
            >
              <ProductImage
                height={'100%'}
                url={selectedProduct?.upload[0]?.url}
              />
            </div>
            <div className="flex flex-col gap-10">
              <ProductInfo
                name={selectedProduct.name}
                price={selectedProduct.price}
                description={selectedProduct.description}
              />
              <ProductActions
                addItem={handleAddToCart}
                openCart={openCart}
                decreaseQuantity={() =>
                  setQuantity((prev) => Math.max(1, prev - 1))
                }
                itemQuantity={quantity}
                increaseQuantity={() => setQuantity((prev) => prev + 1)}
              />
            </div>
          </div>
        )}
        {!similarProducts && similarProductsIsLoading && <Spinner />}
        {similarProducts && !similarProductsIsLoading && (
          <CategorySection
            title={'Similar Products'}
            products={similarProducts}
            dataTest="similar-products"
          />
        )}
      </VStack>
    </PageLayout>
  );
};

export default ViewProductPage;
