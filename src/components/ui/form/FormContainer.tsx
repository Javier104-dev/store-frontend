import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

type PropTypes = IReactChildrenProps & {
	dataTest?: string;
};

const FormContainer = ({ children, dataTest }: PropTypes) => {
	return (
		<div
			className="w-full max-w-[500px] mx-auto"
			{...(dataTest && { 'data-test': dataTest })}
		>
			{children}
		</div>
	);
};

export default FormContainer;
