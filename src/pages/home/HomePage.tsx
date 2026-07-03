import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import { CatalogQueryKeys } from '@/features/catalog/constants/catalog.queryKeys';
import { catalogService } from '@/features/catalog/services/catalog.service';
import CategoriesSection from '@/features/category/components/sections/CategoriesSection';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';
import useGet from '@/hooks/query/useGet';
import Banner from '@/pages/home/components/Banner';

const HomePage = () => {
  const { data: categoriesWithProducts, isLoading } = useGet<ICategory[]>({
    queryKey: [CatalogQueryKeys.getCategoriesWithProducts],
    queryFn: () => catalogService.getCategoriesWithProducts(),
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
