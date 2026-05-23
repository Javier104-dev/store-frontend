import { Form, Formik } from 'formik';

import Button from '@/components/ui/actions/Button';
import FormContainer from '@/components/ui/form/FormContainer';
import Heading from '@/components/ui/heading/Heading';
import type {
  ICategoryOption,
  IImage,
  IProductFormValues,
} from '@/features/catalog/interfaces/form/IProductFormValues';
import FormField from '@/features/product/components/form/form-field/FormField';
import type { IFormikField } from '@/interfaces/form/IFormikField';
import type { IImageField } from '@/interfaces/form/IImageField';
import type { IMultiSelectField } from '@/interfaces/form/IMultiSelectField';

type PropTypes = {
  initialValues: IProductFormValues;
  handleSubmit: (values: IProductFormValues) => void;
  categoriesList: ICategoryOption[];
  isSubmitting: boolean;
  title: string;
  submitText: string;
};

const ProductForm = ({
  initialValues,
  handleSubmit,
  categoriesList,
  isSubmitting,
  title,
  submitText,
}: PropTypes) => {
  const formFields: (
    | IFormikField
    | IMultiSelectField<ICategoryOption>
    | IImageField
  )[] = [
    {
      name: 'images',
      label: 'Imagenes',
      type: 'file',
      multiple: true,
      accept: '.jpg,.jpeg,.png',
    },
    {
      name: 'categories',
      label: 'Categorias',
      type: 'multiSelect',
      resources: [],
    },
    {
      name: 'name',
      label: 'Nombre del producto',
      type: 'text',
      placeholder: 'Nombre',
    },
    {
      name: 'price',
      label: 'Precio del producto',
      type: 'number',
      placeholder: '$ 00,00',
    },
    {
      name: 'description',
      label: 'Descripción del producto',
      type: 'textarea',
      placeholder: 'Descripción del producto',
      rows: 5,
    },
  ];

  const CATEGORIES_KEY_NAME = 'categories';

  const resolvedFormFields = formFields.map((field) => {
    if (field.name === CATEGORIES_KEY_NAME) {
      return {
        ...field,
        resources: categoriesList ?? [],
      };
    }

    return field;
  });

  return (
    <FormContainer>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Heading title={title} />
          {resolvedFormFields.map((field) => (
            <FormField<ICategoryOption | IImage> key={field.name} {...field} />
          ))}
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            innerText={submitText}
            colorFill={true}
            data-test="product-form-submit"
            type="submit"
          />
        </Form>
      </Formik>
    </FormContainer>
  );
};

export default ProductForm;
