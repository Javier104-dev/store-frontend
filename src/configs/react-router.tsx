import { Navigate, createBrowserRouter } from 'react-router-dom';

import { HomeRoutes } from '@/configs/router/HomeRoutes';
import { authRoutes, privateRoutes, universalRoutes } from '@/configs/routes';
import Root from '@/pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      ...authRoutes,
      ...universalRoutes,
      ...privateRoutes,
      {
        path: '*',
        element: <Navigate to={HomeRoutes.HOME} replace />,
      },
    ],
  },
]);

export default router;
