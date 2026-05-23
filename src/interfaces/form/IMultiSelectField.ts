import type { IFormikField } from '@/interfaces/form/IFormikField';

export interface IMultiSelectField<T> extends IFormikField {
  resources?: T[];
}
