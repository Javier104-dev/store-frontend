import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import { notifyError } from '@/errors/notify-error';
import type { ICreateProduct } from '@/features/catalog/interfaces/api/request/ICreateProduct';
import type { IUpdateProduct } from '@/features/catalog/interfaces/api/request/IUpdateProduct';
import type {
  ICategoryOption,
  IProductFormValues,
} from '@/features/catalog/interfaces/form/IProductFormValues';
import { catalogService } from '@/features/catalog/services/catalog.service';
import { CategoryQueryKeys } from '@/features/category/constansts/category.queryKeys';
import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import { categoryService } from '@/features/category/services/category.service';
import ProductForm from '@/features/product/components/form/ProductForm';
import { PRODUCT_FORM_CONFIG } from '@/features/product/constants/product-form.config';
import { PRODUCT_TOAST_MESSAGES } from '@/features/product/constants/product-toast-messages';
import { ProductQueryKeys } from '@/features/product/constants/product.queryKeys';
import type { IProductAttributes } from '@/features/product/interfaces/api/response/IProductAttributes';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';
import { productService } from '@/features/product/services/product.service';
import useGet from '@/hooks/query/useGet';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';
import type {
  IListResponse,
  ISingleResponse,
} from '@/interfaces/api/IApiBaseResponse';
import { notificationService } from '@/services/notification.service';
import {
  normalizeJsonApiItem,
  normalizeJsonApiList,
} from '@/utils/jsonApi-normalizer';

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
    IListResponse<ICategoryAttributes>,
    ICategory[]
  >({
    queryKey: [CategoryQueryKeys.getCategories],
    queryFn: () => categoryService.getCategories(),
    select: normalizeJsonApiList,
  });

  const { data: selectedProduct, isLoading: selectedProductIsLoading } = useGet<
    ISingleResponse<IProductAttributes>,
    IProduct
  >({
    queryKey: [ProductQueryKeys.getProductById, productId],
    queryFn: () => productService.getProductById(productId),
    select: normalizeJsonApiItem,
    enabled: isEdit,
  });

  const { mutate: createProduct, isPending: createProductIsPending } =
    useMutate({
      mutationFn: catalogService.createProduct,
    });

  const { mutate: updateProduct, isPending: updateProductIsPending } =
    useMutate({
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
      price: Number(price),
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
        price: price.toString(),
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
