import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';

type PropsTypes = {
  category: ICategoryOption;
  onSelect: (category: ICategoryOption) => void;
};

const SelectableCategoryTag = ({ category, onSelect }: PropsTypes) => (
  <button
    onClick={() => onSelect(category)}
    className="rounded-full px-4 py-1 bg-[#E8F1FF] hover:bg-[#d3e5ff] active:bg-[#bdd6ff] transition cursor-pointer"
    data-test={`category-select-tag-${category.id}`}
    type="button"
  >
    {category.name}
  </button>
);

export default SelectableCategoryTag;
