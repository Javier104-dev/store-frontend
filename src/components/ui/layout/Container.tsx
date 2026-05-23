import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

const Container = ({ children }: IReactChildrenProps) => {
  return <div className="w-full max-w-[1300px] mx-auto px-2">{children}</div>;
};

export default Container;
