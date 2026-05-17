export interface ICategoryOption {
	id: string;
	name: string;
}

export interface IImage {
	id?: string;
	url: string;
	file?: File;
}

export interface IProductFormValues {
	name: string;
	price: string;
	description: string;
	categories: ICategoryOption[];
	images: IImage[];
}
