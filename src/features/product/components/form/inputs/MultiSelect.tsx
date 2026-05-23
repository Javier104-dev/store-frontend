import { useField } from 'formik';

import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';
import AddCategoryTag from '@/features/category/components/category-tags/AddCategoryTag';
import CategoryTagsList from '@/features/category/components/category-tags/CategoryTagsList';
import RemovableCategoryTag from '@/features/category/components/category-tags/RemovableCategoryTag';
import CategoriesModal from '@/features/category/components/modal/CategoriesModal';
import { useModal } from '@/hooks/modal/useModal';
import type { IMultiSelectField } from '@/interfaces/form/IMultiSelectField';

const MultiSelect = <T,>({ name, resources }: IMultiSelectField<T>) => {
  const [field, , helpers] = useField(name);
  const values: ICategoryOption[] = Array.isArray(field.value)
    ? field.value
    : [];

  const handleRemove = (categoryId: string) => {
    const updatedValues = values.filter((item) => item.id !== categoryId);
    helpers.setValue(updatedValues);
  };

  const { openModal, closeModal, modal } = useModal({ closeOnOutClick: false });

  return (
    <div className="block border-[1px] border-gray-400 rounded-md p-2 text-sm">
      <div className="flex flex-col gap-2">
        <CategoryTagsList
          categories={values}
          renderTag={(category) => (
            <RemovableCategoryTag
              key={category.id}
              category={category}
              handleRemove={handleRemove}
            />
          )}
        />
        <AddCategoryTag label={'Agregar categoría'} openModal={openModal} />
      </div>
      {modal(
        <CategoriesModal
          onClose={closeModal}
          resources={resources as unknown as ICategoryOption[]}
          handleRemove={handleRemove}
          helpers={helpers}
          values={values}
        />,
      )}
    </div>
  );
};

export default MultiSelect;
