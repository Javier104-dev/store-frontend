import { useField } from 'formik';
import type { ChangeEvent } from 'react';

import type { IImage } from '@/features/catalog/interfaces/form/IProductFormValues';
import ProductImageWithActions from '@/features/product/components/ui/ProductImageWithActions ';
import type { IImageField } from '@/interfaces/form/IImageField';

const ImageField = ({ name, ...props }: IImageField) => {
	const [field, , helpers] = useField(name);
	const values: IImage[] = Array.isArray(field.value) ? field.value : [];

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const urls = files.map((file) => ({
			url: URL.createObjectURL(file),
			file,
		}));
		helpers.setValue([...values, ...urls]);
	};

	const handleDelete = (imageIndex: number) => {
		const filteredImages = values.filter((_, index) => index !== imageIndex);
		helpers.setValue(filteredImages);
	};

	return (
		<div className="block border-[1px] border-gray-400 rounded-md p-2 text-sm">
			<input
				data-test="input-files"
				id={name}
				name={name}
				onChange={handleChange}
				{...props}
			/>
			{values.length > 0 && (
				<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
					{values.map((image, i) => (
						<ProductImageWithActions
							height={150}
							url={image.url}
							key={`${image.url}-${i}`}
							onDelete={() => handleDelete(i)}
							dataTest={`product-image-${i}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageField;
