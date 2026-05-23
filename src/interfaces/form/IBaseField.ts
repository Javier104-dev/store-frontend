import type { ChangeEvent } from 'react';

export interface IBaseField {
  label: string;
  type:
    | 'date'
    | 'number'
    | 'text'
    | 'select'
    | 'textarea'
    | 'radio'
    | 'multiSelect'
    | 'datetime-local'
    | 'email'
    | 'password'
    | 'file';
  placeholder?: string;
  options?: string[];
  rows?: number;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  accept?: string;
}
