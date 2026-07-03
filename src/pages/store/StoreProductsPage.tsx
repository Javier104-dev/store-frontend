import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/buttons/Button';
import Spinner from '@/components/ui/feedback/Spinner';
import SectionHeader from '@/components/ui/heading/SectionHeader';
import PageLayout from '@/components/ui/layout/PageLayout';
import VStack from '@/components/ui/layout/VStack';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import { buildStoreProductEditPath } from '@/configs/router/build-path/buildPath';
import { notifyError } from '@/errors/notify-error';
import AllProductsGrid from '@/features/product/components/grids/AllProductsGrid';
import { PRODUCT_TOAST_MESSAGES } from '@/features/product/constants/product-toast-messages';
import { ProductQueryKeys } from '@/features/product/constants/product.queryKeys';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import { productService } from '@/features/product/services/product.service';
import { useStore } from '@/features/store/hooks/useStore';
import useGet from '@/hooks/query/useGet';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';
import { notificationService } from '@/services/notification.service';

const StoreProductsPage = () => {
  const navigate = useNavigate();
  const { invalidateQueryKey } = useInvalidateQueries();

  const { storeInfo } = useStore();

  const { data: products, isLoading: productsIsLoading } = useGet<IProduct[]>({
    queryKey: [ProductQueryKeys.getProductsFromOwner],
    queryFn: () => productService.getProductsFromOwner(),
    enabled: !!storeInfo,
  });

  const { mutate, isPending, variables } = useMutate({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      invalidateQueryKey(ProductQueryKeys.getProductsFromOwner);
    },
  });

  const handleDelete = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        notificationService.success(PRODUCT_TOAST_MESSAGES.deleted);
      },
      onError: (error) => {
        notifyError(error);
      },
    });
  };

  const handleEdit = (id: string) => {
    navigate(buildStoreProductEditPath({ id }));
  };

  return (
    <PageLayout>
      <VStack dataTest="store-products">
        <SectionHeader
          title={'All Products'}
          action={
            <Button
              innerText={'Add Product'}
              to={StoreRoutes.CREATE_PRODUCT}
              colorFill={true}
              paddingX={60}
              data-test="create-product-button"
            />
          }
        />
        {!products && productsIsLoading && <Spinner />}
        {products && !productsIsLoading && (
          <AllProductsGrid
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
            disabled={isPending}
            selectedProductId={variables}
          />
        )}
      </VStack>
    </PageLayout>
  );
};

export default StoreProductsPage;
