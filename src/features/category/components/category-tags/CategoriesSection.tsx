import VStack from '@/components/ui/layout/VStack';
import CategorySection from '@/features/category/components/sections/CategorySection';
import type { ICategory } from '@/features/category/interfaces/types/ICategory';

type PropTypes = {
  categories: ICategory[];
};

const CategoriesSection = ({ categories }: PropTypes) => {
  return (
    <VStack gapClassName={'gap-8 lg:gap-16'}>
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          title={category.name}
          products={category.products || []}
        />
      ))}
    </VStack>
  );
};

export default CategoriesSection;
