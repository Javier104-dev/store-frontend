import type { FieldHelperProps } from 'formik';

import CloseButton from '@/components/ui/buttons/CloseButton';
import FormContainer from '@/components/ui/form/FormContainer';
import SectionHeader from '@/components/ui/heading/SectionHeader';
import VStack from '@/components/ui/layout/VStack';
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
          title={'Categories'}
          action={
            <CloseButton onClose={onClose} dataTest="close-categories-modal" />
          }
        />
        <CategorySelectorContainer
          categories={filteredResources}
          label={'Available Categories'}
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
          label={'Selected Categories'}
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
