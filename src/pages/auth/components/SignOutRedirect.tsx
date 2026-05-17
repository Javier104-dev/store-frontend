import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { HomeRoutes } from '@/configs/router/HomeRoutes.enum';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function SignOutRedirect() {
	const { handleSignOut } = useAuthProvider();
	useEffect(() => {
		handleSignOut();
	}, [handleSignOut]);
	return <Navigate to={HomeRoutes.HOME} />;
}
