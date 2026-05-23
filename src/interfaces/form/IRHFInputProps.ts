import type { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

import type { IRHFField } from '@/interfaces/form/IRHFField';

export interface IRHFInputProps<T extends FieldValues> extends IRHFField<T> {
  register: UseFormRegister<T>;
  error?: FieldError;
}
