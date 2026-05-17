import type { FieldValues } from 'react-hook-form';

import type { IRHFField } from '@/interfaces/form/IRHFField';

const DefaultField = <T extends FieldValues>({
	register,
	...props
}: IRHFField<T>) => (
	<input
		className="block border-[1px] border-gray-400 rounded-md px-5 py-2 text-sm focus:border-[#2A7AE4] outline-none focus:shadow-[#2A7AE4]/30 focus:shadow-outline data-[error=true]:border-red-500"
		id={props.name}
		data-test={props.name}
		{...register(props.name)}
		{...props}
	/>
);

export default DefaultField;
