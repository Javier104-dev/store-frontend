import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { IApiService } from '@/interfaces/services/IApiService';
import type { IAuthService } from '@/pages/auth/interfaces/IAuthService';
import type { IRefreshSessionResponse } from '@/pages/auth/interfaces/IRefreshSessionResponse';
import type { ISignInResponse } from '@/pages/auth/interfaces/ISignInResponse';
import type { ISignUpResponse } from '@/pages/auth/interfaces/ISignUpResponse';
import type { ISuccessfulAuthenticationResponse } from '@/pages/auth/interfaces/ISuccessfulAuthenticationResponse';
import { type ApiRequestConfig, apiService } from '@/services/api.service';

class AuthService implements IAuthService {
  api: IApiService<ApiRequestConfig>;
  constructor(api: IApiService<ApiRequestConfig>) {
    this.api = api;
  }
  async signIn(username: string, password: string, config?: ApiRequestConfig) {
    return await this.api.post<ISingleResponse<ISignInResponse>>(
      '/auth/sign-in',
      { username, password },
      config,
    );
  }
  async signUp(username: string, password: string, config?: ApiRequestConfig) {
    return await this.api.post<ISingleResponse<ISignUpResponse>>(
      '/auth/sign-up',
      { username, password },
      config,
    );
  }
  async confirmUser(username: string, code: string, config?: ApiRequestConfig) {
    return await this.api.post<
      ISingleResponse<ISuccessfulAuthenticationResponse>
    >('/auth/confirm-user', { username, code }, config);
  }
  async confirmPassword(
    username: string,
    newPassword: string,
    code: string,
    config?: ApiRequestConfig,
  ) {
    return await this.api.post<
      ISingleResponse<ISuccessfulAuthenticationResponse>
    >('/auth/confirm-password', { username, newPassword, code }, config);
  }
  async resendConfirmationCode(username: string, config?: ApiRequestConfig) {
    return await this.api.post<
      ISingleResponse<ISuccessfulAuthenticationResponse>
    >('/auth/resend-confirmation-code', { username }, config);
  }
  async forgotPassword(username: string, config?: ApiRequestConfig) {
    return await this.api.post<
      ISingleResponse<ISuccessfulAuthenticationResponse>
    >('/auth/forgot-password', { username }, config);
  }
  async refreshToken(
    username: string,
    refreshToken: string,
    config?: ApiRequestConfig,
  ) {
    return await this.api.post<ISingleResponse<IRefreshSessionResponse>>(
      '/auth/refresh',
      { username, refreshToken },
      config,
    );
  }
}

export const authService = new AuthService(apiService);
