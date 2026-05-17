type RouteParams = Record<string, string | number>;

export const buildRoute = (route: string, params: RouteParams) =>
	Object.entries(params).reduce(
		(path, [key, value]) => path.replace(`:${key}`, String(value)),
		route,
	);
