import type { FieldValues } from 'react-hook-form';

import type { IRHFField } from '@/interfaces/form/IRHFField';

export type IRHFFieldConfig<T extends FieldValues> = Omit<
  IRHFField<T>,
  'register'
>;
