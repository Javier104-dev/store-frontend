import SectionHeader from '@/components/ui/heading/SectionHeader';
import VStack from '@/components/ui/layout/VStack';
import ArrowLink from '@/components/ui/navigation/ArrowLink';
import ProductGrid from '@/features/product/components/grids/ProductGrid';
import type { IProduct } from '@/features/product/interfaces/types/IProduct';

type PropTypes = {
	title: string;
	products: IProduct[];
	dataTest?: string;
};

const CategorySection = ({ title, products, dataTest }: PropTypes) => {
	return (
		<VStack dataTest={dataTest}>
			<SectionHeader
				title={title}
				action={<ArrowLink label={'Ver todo'} to={'#'} />}
			/>
			<ProductGrid products={products} />
		</VStack>
	);
};

export default CategorySection;
