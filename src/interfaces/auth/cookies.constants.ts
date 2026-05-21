export const StoredCookies = {
	ACCESS_TOKEN: 'accessToken',
	USERNAME: 'username',
	REFRESH_TOKEN: 'refreshToken',
} as const;

export type StoredCookiesValues =
	(typeof StoredCookies)[keyof typeof StoredCookies];
