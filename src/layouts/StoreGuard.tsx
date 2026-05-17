import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import { StoreRoutes } from '@/configs/router/StoreRoutes.enum';
import { useStore } from '@/features/store/hooks/useStore';

const StoreGuard = () => {
	const { storeInfo, isLoading } = useStore();

	if (isLoading) {
		return <Spinner />;
	}

	if (!storeInfo) {
		return <Navigate to={StoreRoutes.STORE} replace />;
	}

	return <Outlet />;
};

export default StoreGuard;
