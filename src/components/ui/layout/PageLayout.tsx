import Container from '@/components/ui/layout/Container';
import PageContent from '@/components/ui/layout/PageContent';
import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

const PageLayout = ({ children }: IReactChildrenProps) => {
  return (
    <Container>
      <PageContent>{children}</PageContent>
    </Container>
  );
};

export default PageLayout;
