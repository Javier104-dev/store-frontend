import type { ITokenPayload } from '@/interfaces/auth/ITokenPayload';
import type { StoredCookiesValues } from '@/interfaces/auth/cookies.constants';

export interface ICookieService<T extends ITokenPayload> {
	setUsernameCookie: (username: string, expiresIn: number) => void;
	setRefreshTokenCookie: (refreshToken: string, expiresIn: number) => void;
	setAccessTokenCookie: (accessToken: string) => void;
	getCookie: (name: StoredCookiesValues) => string | undefined;
	remove: (name: StoredCookiesValues) => void;
	removeAll: () => void;
	decodeToken: (token: string) => T | null;
}
