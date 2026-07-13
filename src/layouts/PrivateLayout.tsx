import { Navigate, Outlet } from 'react-router-dom';

import { AuthRoutes } from '@/configs/router/AuthRoutes';
import useAuth from '@/hooks/auth/useAuth';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function PrivateLayout() {
  const { connected } = useAuth();
  const { loadingState } = useAuthProvider();

  if (loadingState.refreshSession) {
    return (
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="flex flex-1 items-center justify-center">
          <span className="material-symbols-outlined animate-spin pointer-events-none">
            progress_activity
          </span>
        </div>
      </div>
    );
  }

  if (!connected) {
    return <Navigate to={AuthRoutes.SIGN_IN} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
