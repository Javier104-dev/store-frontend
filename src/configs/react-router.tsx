import { Navigate, createBrowserRouter } from 'react-router-dom';

import { HomeRoutes } from '@/configs/router/HomeRoutes.enum';
import {
	authRoutes,
	homeRoutes,
	privateRoutes,
	productRoutes,
} from '@/configs/routes';

import Root from '@pages/Root';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			...homeRoutes,
			...authRoutes,
			...productRoutes,
			...privateRoutes,
			{
				path: '*',
				element: <Navigate to={HomeRoutes.HOME} replace />,
			},
		],
	},
]);

export default router;
