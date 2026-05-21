import type { RouteObject } from 'react-router-dom';

import { AuthRoutes } from '@/configs/router/AuthRoutes';
import { HomeRoutes } from '@/configs/router/HomeRoutes';
import { ProductRoutes } from '@/configs/router/ProductRoutes';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import AuthLayout from '@/layouts/AuthLayout';
import PrivateLayout from '@/layouts/PrivateLayout';
import StoreLayout from '@/layouts/StoreLayout';
import About from '@/pages/about/About';
import ConfirmPassword from '@/pages/auth/ConfirmPassword';
import ConfirmUser from '@/pages/auth/ConfirmUser';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResendConfirmationCode from '@/pages/auth/ResendConfirmationCode';
import SignIn from '@/pages/auth/SignIn';
import SignOut from '@/pages/auth/SignOut';
import SignUp from '@/pages/auth/SignUp';
import HomePage from '@/pages/home/HomePage';
import ViewProduct from '@/pages/product/ViewProductPage';
import StorePage from '@/pages/store/StorePage';
import StoreProductsPage from '@/pages/store/StoreProductsPage';

import ProductForm from '@pages/store/ProductFormPage';

export const authRoutes: RouteObject[] = [
	{
		path: AuthRoutes.SIGN_OUT,
		element: <SignOut />,
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: AuthRoutes.SIGN_IN,
				element: <SignIn />,
			},
			{
				path: AuthRoutes.SIGN_UP,
				element: <SignUp />,
			},
			{
				path: AuthRoutes.CONFIRM_USER,
				element: <ConfirmUser />,
			},
			{
				path: AuthRoutes.CONFIRM_PASSWORD,
				element: <ConfirmPassword />,
			},
			{
				path: AuthRoutes.RESEND_CONFIRMATION_CODE,
				element: <ResendConfirmationCode />,
			},
			{
				path: AuthRoutes.FORGOT_PASSWORD,
				element: <ForgotPassword />,
			},
		],
	},
];

const storeRoutes: RouteObject[] = [
	{
		path: StoreRoutes.STORE,
		element: <StorePage />,
	},
	{
		element: <StoreLayout />,
		children: [
			{
				path: StoreRoutes.MANAGE_PRODUCTS,
				element: <StoreProductsPage />,
			},
			{
				path: StoreRoutes.CREATE_PRODUCT,
				element: <ProductForm />,
			},
			{
				path: StoreRoutes.EDIT_PRODUCT,
				element: <ProductForm />,
			},
		],
	},
];

export const privateRoutes: RouteObject[] = [
	{
		element: <PrivateLayout />,
		children: [
			...storeRoutes,
			{
				path: '/about',
				element: <About />,
			},
		],
	},
];

export const homeRoutes: RouteObject[] = [
	{
		index: true,
		path: HomeRoutes.HOME,
		element: <HomePage />,
	},
];

export const productRoutes: RouteObject[] = [
	{
		path: ProductRoutes.VIEW_PRODUCT,
		element: <ViewProduct />,
	},
];
