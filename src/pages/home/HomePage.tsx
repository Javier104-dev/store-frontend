import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import { CatalogQueryKeys } from '@/features/catalog/constants/catalog.queryKeys';
import { catalogService } from '@/features/catalog/services/catalog.service';
import CategoriesSection from '@/features/category/components/sections/CategoriesSection';
import type { ICategoryAttributes } from '@/features/category/interfaces/api/response/ICategoryAttributes';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import useGet from '@/hooks/query/useGet';
import type { IListResponse } from '@/interfaces/api/IApiBaseResponse';
import Banner from '@/pages/home/components/Banner';
import { normalizeJsonApiList } from '@/utils/jsonApi-normalizer';

const HomePage = () => {
  const { data: categoriesWithProducts, isLoading } = useGet<
    IListResponse<ICategoryAttributes>,
    ICategory[]
  >({
    queryKey: [CatalogQueryKeys.getCategoriesWithProducts],
    queryFn: () => catalogService.getCategoriesWithProducts(),
    select: normalizeJsonApiList,
  });

  return (
    <div>
      <Banner />
      <PageLayout>
        {!categoriesWithProducts && isLoading && <Spinner />}
        {categoriesWithProducts && !isLoading && (
          <CategoriesSection categories={categoriesWithProducts} />
        )}
      </PageLayout>
    </div>
  );
};

export default HomePage;
