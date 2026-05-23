import type { ReactNode } from 'react';

import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';

type PropsTypes = {
  categories: ICategoryOption[];
  renderTag: (category: ICategoryOption) => ReactNode;
};

const CategoryTagsList = ({ categories, renderTag }: PropsTypes) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => renderTag(category))}
  </div>
);

export default CategoryTagsList;
