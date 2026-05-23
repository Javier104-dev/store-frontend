import { ReactNode } from 'react';

import Heading from '@/components/ui/heading/Heading';

type PropTypes = {
  title: string;
  action: ReactNode;
};

const SectionHeader = ({ title, action }: PropTypes) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title={title} />
      {action}
    </div>
  );
};

export default SectionHeader;
