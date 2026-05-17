import { useForm } from 'react-hook-form';

import FormField from '@/components/forms/form-field/FormFiel';
import Button from '@/components/ui/actions/Button';
import FormContainer from '@/components/ui/form/FormContainer';
import Heading from '@/components/ui/heading/Heading';
import type { IStoreFormValues } from '@/features/store/interfaces/form/IStoreFormValues';
import type { IRHFFieldConfig } from '@/interfaces/form/IRHFFieldConfig';

type PropsTypes = {
	handleStoreSubmit: (values: IStoreFormValues) => void;
	defaultValues: IStoreFormValues;
	isSubmitting: boolean;
	title: string;
	submitText: string;
};

const StoreForm = ({
	handleStoreSubmit,
	defaultValues,
	isSubmitting,
	title,
	submitText,
}: PropsTypes) => {
	const { register, handleSubmit } = useForm<IStoreFormValues>({
		defaultValues,
	});

	const formFields: IRHFFieldConfig<IStoreFormValues>[] = [
		{
			name: 'name',
			label: 'Nombre de la tienda',
			type: 'text',
			placeholder: 'Nombre de la tienda',
		},
	];

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(handleStoreSubmit)}>
				<Heading title={title} />
				{formFields.map((field) => (
					<FormField<IStoreFormValues>
						key={field.name}
						register={register}
						{...field}
					/>
				))}
				<Button
					isLoading={isSubmitting}
					disabled={isSubmitting}
					innerText={submitText}
					colorFill={true}
					data-test="product-form-submit"
					type="submit"
				/>
			</form>
		</FormContainer>
	);
};

export default StoreForm;
