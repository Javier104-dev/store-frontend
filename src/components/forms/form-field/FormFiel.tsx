import type { FieldValues } from 'react-hook-form';

import DefaultField from '@/components/forms/inputs/DefaultField';
import type { IRHFField } from '@/interfaces/form/IRHFField';

const FormField = <T extends FieldValues>({
	register,
	...props
}: IRHFField<T>) => {
	const renderField = () => {
		switch (props.type) {
			default:
				return <DefaultField<T> register={register} {...props} />;
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
				{}
			</div>
		</div>
	);
};

export default FormField;
