import type { ReactNode } from 'react';

import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';
import CategoryTagsList from '@/features/category/components/category-tags/CategoryTagsList';

type PropTypes = {
	categories: ICategoryOption[];
	label: string;
	renderTag: (category: ICategoryOption) => ReactNode;
	dataTest: string;
};

const CategorySelectorContainer = ({
	categories,
	label,
	renderTag,
	dataTest,
}: PropTypes) => {
	return (
		<div className="relative w-full min-h-14" data-test={dataTest}>
			<label className="text-xs font-light absolute bg-white text-gray-400 top-[-8px] left-[16px] px-1 rounded-full">
				{label}
			</label>
			<div className="block border-[1px] border-gray-400 rounded-md p-2 text-sm">
				<CategoryTagsList categories={categories} renderTag={renderTag} />
			</div>
		</div>
	);
};

export default CategorySelectorContainer;
