import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import type { IBaseField } from '@/interfaces/form/IBaseField';

export interface IRHFField<T extends FieldValues> extends IBaseField {
	name: Path<T>;
	register: UseFormRegister<T>;
}
