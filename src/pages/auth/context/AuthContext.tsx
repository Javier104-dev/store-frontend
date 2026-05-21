import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthRoutes } from '@/configs/router/AuthRoutes';
import { HomeRoutes } from '@/configs/router/HomeRoutes';
import { StoreRoutes } from '@/configs/router/StoreRoutes';
import { UserQueryKeys } from '@/features/user/constants/user.queryKeys';
import { userService } from '@/features/user/services/user.service';
import { StoredCookies } from '@/interfaces/auth/cookies.constants';
import {
	CONFIRMATION_SENT_MESSAGE,
	SESSION_EXPIRED_ERROR,
	SIGN_IN_SUCCESS_MESSAGE,
	SIGN_OUT_SUCCESS_MESSAGE,
	SIGN_UP_SUCCESS_MESSAGE,
} from '@/pages/auth/context/auth-messages';
import { useLoadingState } from '@/pages/auth/hooks/useAuthState';
import { AuthContext } from '@/pages/auth/provider/AuthProvider';
import { authService } from '@/pages/auth/services/auth.service';
import { apiService } from '@/services/api.service';
import { cookieService } from '@/services/cookie.service';
import { notificationService } from '@/services/notification.service';

type PropTypes = { children: React.ReactNode };
export const AuthProvider = ({ children }: PropTypes) => {
	const { loadingState, setLoadingState } = useLoadingState();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const handleSignIn = useCallback(
		(username: string, password: string) => {
			async function signIn(username: string, password: string) {
				setLoadingState('signIn', true);
				try {
					const { data } = await authService.signIn(username, password);
					const { accessToken, refreshToken } = data.attributes;

					cookieService.setAccessTokenCookie(accessToken);
					cookieService.setRefreshTokenCookie(refreshToken);
					cookieService.setUsernameCookie(username);
					apiService.setAuthentication(accessToken);
					const userResponse = await userService.getMe();
					queryClient.setQueryData([UserQueryKeys.getMe], userResponse);
					notificationService.success(SIGN_IN_SUCCESS_MESSAGE);
					const roles = userResponse.data.attributes.roles;
					if (roles.includes('admin')) {
						navigate(StoreRoutes.MANAGE_PRODUCTS);
					} else {
						navigate(HomeRoutes.HOME);
					}
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when requesting user confirmation: ${error}`,
						);
					}
				} finally {
					setLoadingState('signIn', false);
				}
			}
			return signIn(username, password);
		},
		[setLoadingState, queryClient, navigate],
	);

	const handleSignUp = useCallback(
		(username: string, password: string) => {
			async function signUp(username: string, password: string) {
				setLoadingState('signUp', true);
				try {
					await authService.signUp(username, password);
					notificationService.success(CONFIRMATION_SENT_MESSAGE);
					notificationService.success(SIGN_UP_SUCCESS_MESSAGE);
					navigate(AuthRoutes.CONFIRM_USER);
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when signing up: ${error}`,
						);
					}
				} finally {
					setLoadingState('signUp', false);
				}
			}
			return signUp(username, password);
		},
		[setLoadingState, navigate],
	);

	const handleConfirmUser = useCallback(
		(username: string, code: string) => {
			async function confirmUser(username: string, code: string) {
				setLoadingState('confirmUser', true);
				try {
					const { data } = await authService.confirmUser(username, code);
					notificationService.success(data.attributes.message);
					navigate(AuthRoutes.SIGN_IN);
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when requesting user confirmation: ${error}`,
						);
					}
				} finally {
					setLoadingState('confirmUser', false);
				}
			}
			return confirmUser(username, code);
		},
		[setLoadingState, navigate],
	);

	const handleSignOut = useCallback(() => {
		cookieService.removeAll();
		notificationService.success(SIGN_OUT_SUCCESS_MESSAGE);
	}, []);

	const handleForgotPassword = useCallback(
		(username: string) => {
			async function forgotPassword(username: string) {
				setLoadingState('forgotPassword', true);
				try {
					const { data } = await authService.forgotPassword(username);
					notificationService.success(data.attributes.message);
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when requesting password change: ${error}`,
						);
					}
				} finally {
					setLoadingState('forgotPassword', false);
				}
			}
			return forgotPassword(username);
		},
		[setLoadingState],
	);

	const handleConfirmPassword = useCallback(
		(username: string, newPassword: string, code: string) => {
			async function confirmPassword(
				username: string,
				newPassword: string,
				code: string,
			) {
				setLoadingState('confirmPassword', true);
				try {
					const { data } = await authService.confirmPassword(
						username,
						newPassword,
						code,
					);
					notificationService.success(data.attributes.message);
					navigate(AuthRoutes.SIGN_IN);
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when requesting password change confirmation: ${error}`,
						);
					}
				} finally {
					setLoadingState('confirmPassword', false);
				}
			}
			return confirmPassword(username, newPassword, code);
		},
		[setLoadingState, navigate],
	);

	const handleResendConfirmationCode = useCallback(
		(username: string) => {
			async function resendConfirmationCode(username: string) {
				setLoadingState('resendConfirmationCode', true);
				try {
					const { data } = await authService.resendConfirmationCode(username);
					notificationService.success(data.attributes.message);
					navigate(AuthRoutes.CONFIRM_USER);
				} catch (error: unknown) {
					if (error instanceof Error) {
						notificationService.error(error.message);
					} else {
						notificationService.error(
							`Unknown error when requesting password change confirmation: ${error}`,
						);
					}
				} finally {
					setLoadingState('resendConfirmationCode', false);
				}
			}
			return resendConfirmationCode(username);
		},
		[setLoadingState, navigate],
	);

	const handleRefreshSession = useCallback(() => {
		async function refreshSession() {
			setLoadingState('refreshSession', true);
			try {
				const username = cookieService.getCookie(StoredCookies.USERNAME) || '';
				const accessToken =
					cookieService.getCookie(StoredCookies.ACCESS_TOKEN) || '';
				const refreshToken =
					cookieService.getCookie(StoredCookies.REFRESH_TOKEN) || '';
				if (!username || !refreshToken) {
					throw new Error(SESSION_EXPIRED_ERROR);
				}

				if (!accessToken) {
					const { data } = await authService.refreshToken(
						username,
						refreshToken,
					);
					cookieService.setAccessTokenCookie(accessToken);
					apiService.setAuthentication(data.attributes.accessToken);
				}
				setLoadingState('refreshSession', false);
			} catch (error) {
				navigate(AuthRoutes.SIGN_IN);
				if (error instanceof Error) notificationService.error(error.message);
				else
					notificationService.error(
						'Unexpected error while refreshing your session.\nPlease sign in again.',
					);
			}
		}
		return refreshSession();
	}, [setLoadingState, navigate]);

	const contextValue = {
		loadingState,
		handleConfirmPassword,
		handleConfirmUser,
		handleForgotPassword,
		handleRefreshSession,
		handleResendConfirmationCode,
		handleSignIn,
		handleSignOut,
		handleSignUp,
	};
	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
