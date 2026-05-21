import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

import { HomeRoutes } from '@/configs/router/HomeRoutes';
import { StoredCookies } from '@/interfaces/auth/cookies.constants';

export default function AuthLayout() {
	const [cookies] = useCookies([
		StoredCookies.USERNAME,
		StoredCookies.REFRESH_TOKEN,
	]);

	const isAuthenticated =
		!!cookies[StoredCookies.REFRESH_TOKEN] && !!cookies[StoredCookies.USERNAME];

	if (isAuthenticated) {
		return <Navigate to={HomeRoutes.HOME} replace />;
	}

	return (
		<div>
			<Outlet />
		</div>
	);
}
