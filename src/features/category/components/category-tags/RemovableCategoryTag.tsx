import { IoMdCloseCircleOutline } from 'react-icons/io';

import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';

type PropTypes = {
  category: ICategoryOption;
  handleRemove: (categoryId: string) => void;
};

const RemovableCategoryTag = ({ category, handleRemove }: PropTypes) => {
  return (
    <button
      onClick={() => handleRemove(category.id)}
      className="rounded-full px-4 py-1 bg-[#E8F1FF] hover:bg-[#d3e5ff] active:bg-[#bdd6ff] transition"
      data-test={`category-remove-tag-${category.id}`}
      type="button"
    >
      <span className="flex items-center gap-2">
        <p>{category.name}</p>
        <IoMdCloseCircleOutline className="text-[20px] text-[#2A7AE4] hover:text-[#1F63C9]" />
      </span>
    </button>
  );
};

export default RemovableCategoryTag;
