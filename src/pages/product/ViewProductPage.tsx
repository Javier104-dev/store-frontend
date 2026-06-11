import { useParams } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import VStack from '@/components/ui/layout/VStack';
import CategorySection from '@/features/category/components/sections/CategorySection';
import ProductImage from '@/features/product/components/ui/ProductImage';
import ProductInfo from '@/features/product/components/ui/ProductInfo';
import { ProductQueryKeys } from '@/features/product/constants/product.queryKeys';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import { productService } from '@/features/product/services/product.service';
import useGet from '@/hooks/query/useGet';
import type {
  IListResponse,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import {
  normalizeJsonApiItem,
  normalizeJsonApiList,
} from '@/utils/jsonApi-normalizer';

const ViewProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ?? '';

  const { data: selectedProduct, isLoading } = useGet<
    ISingleResponse<IProductAttributes>,
    IProduct
  >({
    queryKey: [ProductQueryKeys.getProductById, productId],
    queryFn: () => productService.getProductById(productId),
    select: normalizeJsonApiItem,
    enabled: Boolean(id),
  });

  const categoryId: string = selectedProduct?.categories?.[0]?.id ?? '';

  const { data: similarProducts, isLoading: similarProductsIsLoading } = useGet<
    IListResponse<IProductAttributes>,
    IProduct[]
  >({
    queryKey: [ProductQueryKeys.getProductsByCategoryId, categoryId],
    queryFn: () => productService.getProducts({ categoryId }),
    select: normalizeJsonApiList,
    enabled: Boolean(categoryId),
  });

  return (
    <PageLayout>
      <VStack>
        {!selectedProduct && isLoading && <Spinner />}
        {selectedProduct && !isLoading && (
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div
              className="h-[220px] w-[100%] md:h-[160px] md:w-[250px] lg:h-[400px] lg:w-[560px] flex-shrink-0"
              data-test="product-image"
            >
              <ProductImage
                height={'100%'}
                url={selectedProduct?.upload[0]?.url}
              />
            </div>
            <ProductInfo
              name={selectedProduct.name}
              price={selectedProduct.price}
              description={selectedProduct.description}
            />
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
