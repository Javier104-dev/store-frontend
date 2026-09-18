import { useEffect, useState } from 'react';

import Spinner from '@/components/ui/feedback/Spinner';
import type { IReactChildrenProps } from '@/interfaces/IReactChildren';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

const AuthBootstrap = ({ children }: IReactChildrenProps) => {
  const { handleRefreshSession, loadingState } = useAuthProvider();
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  useEffect(() => {
    handleRefreshSession().finally(() => {
      setIsSessionChecked(true);
    });
  }, [handleRefreshSession]);

  if (!isSessionChecked || loadingState.refreshSession) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthBootstrap;
