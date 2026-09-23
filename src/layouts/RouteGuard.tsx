import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import { AuthRoutes } from '@/configs/router/AuthRoutes';
import { useUser } from '@/features/user/hooks/useUser';
import type { UserRole } from '@/features/user/interfaces/types/UserRole';
import useAuth from '@/hooks/auth/useAuth';
import getDefaultRouteForRole from '@/layouts/utils/get-default-route-for-role';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

interface PropTypes {
  allowedRoles?: UserRole[];
  allowUnauthenticated?: boolean;
}

const RouteGuard = ({
  allowedRoles,
  allowUnauthenticated = false,
}: PropTypes) => {
  const { connected } = useAuth();
  const { userInfo, isLoading: isUserLoading } = useUser({
    enabled: connected,
  });
  const { loadingState } = useAuthProvider();

  if (loadingState.refreshSession || (connected && isUserLoading)) {
    return <Spinner />;
  }

  if (!connected) {
    return allowUnauthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={AuthRoutes.SIGN_IN} replace />
    );
  }

  const hasAllowedRole =
    !allowedRoles ||
    userInfo?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to={getDefaultRouteForRole(userInfo?.roles)} replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
