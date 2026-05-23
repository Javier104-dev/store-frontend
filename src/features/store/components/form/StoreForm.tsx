import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import FormField from '@/components/forms/form-field/FormFiel';
import Button from '@/components/ui/actions/Button';
import FormContainer from '@/components/ui/form/FormContainer';
import Heading from '@/components/ui/heading/Heading';
import { storeFormSchema } from '@/features/store/components/form/schemas/store-form.schema';
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
	const methods = useForm<IStoreFormValues>({
		resolver: zodResolver(storeFormSchema),
		mode: 'onTouched',
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
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(handleStoreSubmit)}>
					<Heading title={title} />
					{formFields.map((field) => (
						<FormField<IStoreFormValues> key={field.name} {...field} />
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
			</FormProvider>
		</FormContainer>
	);
};

export default StoreForm;
