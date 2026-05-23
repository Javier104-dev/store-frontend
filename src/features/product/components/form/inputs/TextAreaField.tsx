import { Field } from 'formik';

import type { IFormikField } from '@/interfaces/form/IFormikField';

const TextAreaField = (props: IFormikField) => (
  <Field
    as="textarea"
    className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-blue-400 focus:shadow-sm focus:shadow-blue-400"
    id={props.name}
    data-test={props.name}
    {...props}
  />
);

export default TextAreaField;
