import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import { useStore } from '@/features/store/hooks/useStore';

const StoreLayout = () => {
  const { storeInfo, isLoading } = useStore();

  if (isLoading) {
    return <Spinner />;
  }

  if (!storeInfo) {
    return <Navigate to={StoreRoutes.STORE} replace />;
  }

  return <Outlet />;
};

export default StoreLayout;
