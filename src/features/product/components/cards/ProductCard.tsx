import { Link } from 'react-router-dom';

import { buildViewProductPath } from '@/configs/router/build-path/buildPath';
import ProductImage from '@/features/product/components/ui/ProductImage';

type PropTypes = {
	height: number;
	id: string;
	name: string;
	price: number;
	url: string;
};

const ProductCard = ({ height, id, name, price, url }: PropTypes) => {
	return (
		<div data-test={`product-card-${id}`}>
			<ProductImage height={height} url={url} />
			<div className="mt-2">
				<h1 className="text-[14px]">{name}</h1>
				<p className="font-bold text-[16px]">$ {price}</p>
				<Link
					to={buildViewProductPath({ id })}
					className="font-bold text-[16px] text-[#2A7AE4]"
					data-test={`view-product-${id}`}
				>
					Ver producto
				</Link>
			</div>
		</div>
	);
};

export default ProductCard;
