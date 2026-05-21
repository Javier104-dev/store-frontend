import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

const PageContent = ({ children }: IReactChildrenProps) => {
	return <div className="my-4 lg:my-8">{children}</div>;
};

export default PageContent;
