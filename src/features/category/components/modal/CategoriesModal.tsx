import type { FieldHelperProps } from 'formik';

import FormContainer from '@/components/ui/form/FormContainer';
import SectionHeader from '@/components/ui/heading/SectionHeader';
import VStack from '@/components/ui/layout/VStack';
import CloseModalButton from '@/components/ui/modal/CloseModalButton';
import type { ICategoryOption } from '@/features/catalog/interfaces/form/IProductFormValues';
import RemovableCategoryTag from '@/features/category/components/category-tags/RemovableCategoryTag';
import SelectableCategoryTag from '@/features/category/components/category-tags/SelectableCategoryTag';
import CategorySelectorContainer from '@/features/category/components/selector/CategorySelectorContainer';

type PropTypes = {
  onClose: () => void;
  handleRemove: (categoryId: string) => void;
  resources: ICategoryOption[];
  helpers: FieldHelperProps<unknown>;
  values: ICategoryOption[];
};

const CategoriesModal = ({
  onClose,
  handleRemove,
  resources,
  helpers,
  values,
}: PropTypes) => {
  const handleSelect = (selectedResource: ICategoryOption) => {
    helpers.setValue([...values, selectedResource]);
  };

  const filteredResources = resources.filter(
    (resource) => !values.some((item) => item.id === resource.id),
  );

  return (
    <FormContainer dataTest="categories-modal">
      <VStack>
        <SectionHeader
          title={'Categorias'}
          action={<CloseModalButton onClose={onClose} />}
        />
        <CategorySelectorContainer
          categories={filteredResources}
          label={'Categorias disponibles'}
          renderTag={(category) => (
            <SelectableCategoryTag
              key={category.id}
              category={category}
              onSelect={handleSelect}
            />
          )}
          dataTest="available-categories"
        />
        <CategorySelectorContainer
          categories={values}
          label={'Categorias seleccionadas'}
          renderTag={(category) => (
            <RemovableCategoryTag
              key={category.id}
              category={category}
              handleRemove={handleRemove}
            />
          )}
          dataTest="selected-categories"
        />
      </VStack>
    </FormContainer>
  );
};

export default CategoriesModal;
