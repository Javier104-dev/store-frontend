type PropTypes = {
	name: string;
	price: number;
	description: string;
};

const ProductInfo = ({ name, price, description }: PropTypes) => {
	return (
		<div className="flex flex-col justify-center gap-1">
			<h1 className="text-[22px] lg:text-[52px]" data-test="product-name">
				{name}
			</h1>
			<p className="font-bold" data-test="product-price">
				$ {price}
			</p>
			<p className="text-[14px] lg:text-[16px]" data-test="product-description">
				{description}
			</p>
		</div>
	);
};

export default ProductInfo;
