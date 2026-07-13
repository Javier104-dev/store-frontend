import { Navigate, Outlet } from 'react-router-dom';

import { HomeRoutes } from '@/configs/router/HomeRoutes';
import useAuth from '@/hooks/auth/useAuth';

export default function AuthLayout() {
  const { connected } = useAuth();

  if (connected) {
    return <Navigate to={HomeRoutes.HOME} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
