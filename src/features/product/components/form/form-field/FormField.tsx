import { ErrorMessage } from 'formik';

import DefaultField from '@/features/product/components/form/inputs/DefaultField';
import ImageField from '@/features/product/components/form/inputs/ImageField';
import MultiSelect from '@/features/product/components/form/inputs/MultiSelect';
import TextAreaField from '@/features/product/components/form/inputs/TextAreaField';
import type { IFormikField } from '@/interfaces/form/IFormikField';
import type { IImageField } from '@/interfaces/form/IImageField';
import type { IMultiSelectField } from '@/interfaces/form/IMultiSelectField';

type PropsTypes<T> = IFormikField | IMultiSelectField<T> | IImageField;

const FormField = <T,>(props: PropsTypes<T>) => {
  const renderField = () => {
    switch (props.type) {
      case 'textarea':
        return <TextAreaField {...props} />;
      case 'multiSelect':
        return <MultiSelect {...props} />;
      case 'file':
        return <ImageField {...props} />;
      default:
        return <DefaultField {...props} />;
    }
  };

  return (
    <div className="flex flex-col relative w-full my-2 min-h-14 my-4">
      <label
        className="text-xs font-light absolute bg-white text-gray-400 top-[-8px] left-[16px] px-1 rounded-full"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      {renderField()}
      <div className="w-full h-3" data-test={`form-input-error-${props.name}`}>
        <ErrorMessage
          className="text-red-500 text-xs w-full"
          name={props.name}
          component="p"
        />
      </div>
    </div>
  );
};

export default FormField;
