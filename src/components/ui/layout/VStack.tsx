import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

interface PropTypes extends IReactChildrenProps {
	dataTest?: string;
	gapClassName?: string;
}

const VStack = ({ children, gapClassName, dataTest }: PropTypes) => {
	return (
		<div
			className={`flex flex-col ${gapClassName ?? 'gap-4'}`}
			{...(dataTest && { 'data-test': dataTest })}
		>
			{children}
		</div>
	);
};

export default VStack;
