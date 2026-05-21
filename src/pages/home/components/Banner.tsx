import Button from '@/components/ui/actions/Button';
import PageLayout from '@/components/ui/layout/PageLayout';

import hero from '@assets/banner/Hero.png';

const Banner = () => {
	return (
		<div
			style={{ backgroundImage: `url(${hero})` }}
			className="bg-center bg-cover bg-no-repeat h-[350px] flex items-end"
			data-test="banner"
		>
			<PageLayout>
				<div className="text-[#FFFFFF]">
					<div className="font-bold mb-3">
						<h1 className="text-[52px]">Febrero Promocional</h1>
						<p className="text-[22px]">
							Productos selecionados con 33% de descuento
						</p>
					</div>
					<Button
						innerText={'Ver consolas'}
						colorFill={true}
						to="#"
						width={130}
					/>
				</div>
			</PageLayout>
		</div>
	);
};

export default Banner;
