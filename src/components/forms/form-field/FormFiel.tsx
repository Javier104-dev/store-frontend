import {
	type FieldError,
	type FieldValues,
	useFormContext,
	useFormState,
} from 'react-hook-form';

import DefaultField from '@/components/forms/inputs/DefaultField';
import type { IRHFField } from '@/interfaces/form/IRHFField';

const FormField = <T extends FieldValues>({ ...props }: IRHFField<T>) => {
	const { register, control } = useFormContext<T>();

	const { errors } = useFormState({
		control,
		name: props.name,
	});

	const error = errors[props.name] as FieldError | undefined;

	const renderField = () => {
		switch (props.type) {
			default:
				return <DefaultField<T> register={register} error={error} {...props} />;
		}
	};

	return (
		<div className="flex flex-col relative w-full min-h-14 my-4">
			<label
				className="text-xs font-light absolute bg-white text-gray-400 top-[-8px] left-[16px] px-1 rounded-full"
				htmlFor={props.name}
			>
				{props.label}
			</label>
			{renderField()}
			{error && (
				<div
					className="w-full h-3 text-red-500 text-xs"
					data-test={`form-input-error-${props.name}`}
				>
					{error.message}
				</div>
			)}
		</div>
	);
};

export default FormField;
