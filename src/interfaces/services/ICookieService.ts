import type { ITokenPayload } from '@/interfaces/auth/ITokenPayload';
import { StoredCookies } from '@/interfaces/auth/cookies.enum';

export interface ICookieService<T extends ITokenPayload> {
	setUsernameCookie: (username: string, expiresIn: number) => void;
	setRefreshTokenCookie: (refreshToken: string, expiresIn: number) => void;
	setAccessTokenCookie: (accessToken: string) => void;
	getCookie: (name: StoredCookies) => string | undefined;
	remove: (name: StoredCookies) => void;
	removeAll: () => void;
	decodeToken: (token: string) => T | null;
}
