import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import { notifyError } from '@/errors/notify-error';
import type { ICreateProduct } from '@/features/catalog/interfaces/api/request/ICreateProduct';
import type { ICreateProductVariables } from '@/features/catalog/interfaces/api/request/ICreateProductVariables';
import type { IUpdateProduct } from '@/features/catalog/interfaces/api/request/IUpdateProduct';
import type { IUpdateProductVariables } from '@/features/catalog/interfaces/api/request/IUpdateProductVariables';
import type {
  ICategoryOption,
  IProductFormValues,
} from '@/features/catalog/interfaces/form/IProductFormValues';
import { catalogService } from '@/features/catalog/services/catalog.service';
import { CategoryQueryKeys } from '@/features/category/constansts/category.queryKeys';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import { categoryService } from '@/features/category/services/category.service';
import ProductForm from '@/features/product/components/form/ProductForm';
import { PRODUCT_FORM_CONFIG } from '@/features/product/constants/product-form.config';
import { PRODUCT_TOAST_MESSAGES } from '@/features/product/constants/product-toast-messages';
import { ProductQueryKeys } from '@/features/product/constants/product.queryKeys';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import { productService } from '@/features/product/services/product.service';
import useGet from '@/hooks/query/useGet';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';
import { notificationService } from '@/services/notification.service';

const initialValues: IProductFormValues = {
  name: '',
  price: '',
  description: '',
  categories: [],
  images: [],
};

const ProductFormPage = () => {
  const navigate = useNavigate();
  const { invalidateQueryKeys } = useInvalidateQueries();

  const { id } = useParams<{ id: string }>();
  const productId = id ?? '';
  const isEdit = Boolean(productId);

  const { data: allCategories, isLoading: allCategoriesIsLoading } = useGet<
    ICategory[]
  >({
    queryKey: [CategoryQueryKeys.getCategories],
    queryFn: () => categoryService.getCategories(),
  });

  const { data: selectedProduct, isLoading: selectedProductIsLoading } =
    useGet<IProduct>({
      queryKey: [ProductQueryKeys.getProductById, productId],
      queryFn: () => productService.getProductById(productId),
      enabled: isEdit,
    });

  const { mutate: createProduct, isPending: createProductIsPending } =
    useMutate<void, ICreateProductVariables>({
      mutationFn: catalogService.createProduct,
    });

  const { mutate: updateProduct, isPending: updateProductIsPending } =
    useMutate<void, IUpdateProductVariables>({
      mutationFn: catalogService.updateProduct,
      onSuccess: () => {
        invalidateQueryKeys([ProductQueryKeys.getProductById, productId]);
      },
    });

  const config = isEdit ? PRODUCT_FORM_CONFIG.edit : PRODUCT_FORM_CONFIG.create;
  const mutation = isEdit ? updateProduct : createProduct;
  const isPending = createProductIsPending || updateProductIsPending;
  const mutationMessage = isEdit
    ? PRODUCT_TOAST_MESSAGES.updated
    : PRODUCT_TOAST_MESSAGES.created;

  const handleSubmit = (values: IProductFormValues) => {
    const { name, price, description, categories, images } = values;

    const { uploadIds, files } = images.reduce<{
      uploadIds: string[];
      files: File[];
    }>(
      (acc, image) => {
        if (image.id) acc.uploadIds.push(image.id);
        if (image.file) acc.files.push(image.file);
        return acc;
      },
      { uploadIds: [], files: [] },
    );

    const payload: ICreateProduct | IUpdateProduct = {
      ...(isEdit && { id }),
      ...(isEdit && { uploadIds }),
      name,
      price: Number.parseFloat(price),
      description,
      categoryIds: categories?.map((category) => category.id),
    };

    mutation(
      { product: payload, files },
      {
        onSuccess: () => {
          notificationService.success(mutationMessage);
        },
        onError: (error) => {
          notifyError(error);
        },
        onSettled: () => {
          navigate(StoreRoutes.MANAGE_PRODUCTS);
        },
      },
    );
  };

  const handleInitialValues = (
    selectedProduct?: IProduct,
  ): IProductFormValues => {
    if (isEdit && selectedProduct) {
      const { name, price, description, categories, upload } = selectedProduct;

      return {
        name,
        price: price.toFixed(2),
        description,
        categories:
          categories?.map((category) => ({
            id: category.id,
            name: category.name,
          })) ?? [],
        images:
          upload?.map((image) => ({ id: image.id, url: image.url })) ?? [],
      };
    }
    return initialValues;
  };

  const prepareCategoryOption = (categories: ICategory[]): ICategoryOption[] =>
    categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

  const isLoadingData =
    allCategoriesIsLoading || (isEdit && selectedProductIsLoading);

  return (
    <PageLayout>
      {isLoadingData && <Spinner />}
      {!isLoadingData && (
        <ProductForm
          initialValues={handleInitialValues(selectedProduct)}
          handleSubmit={handleSubmit}
          categoriesList={prepareCategoryOption(allCategories ?? [])}
          isSubmitting={isPending}
          title={config.title}
          submitText={config.submitText}
        />
      )}
    </PageLayout>
  );
};

export default ProductFormPage;
