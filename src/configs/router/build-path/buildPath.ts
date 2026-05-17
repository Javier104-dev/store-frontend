import { ProductRoutes } from '@/configs/router/ProductRoutes.enum';
import { StoreRoutes } from '@/configs/router/StoreRoutes.enum';
import { buildRoute } from '@/configs/router/build-path/buildRoute';

export const buildViewProductPath = (params: { id: string }) => {
	return buildRoute(ProductRoutes.VIEW_PRODUCT, params);
};

export const buildStoreProductEditPath = (params: { id: string }) => {
	return buildRoute(StoreRoutes.EDIT_PRODUCT, params);
};
