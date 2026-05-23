import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import type { IRefreshSessionResponse } from '@/pages/auth/interfaces/IRefreshSessionResponse';
import type { ISignInResponse } from '@/pages/auth/interfaces/ISignInResponse';
import type { ISignUpResponse } from '@/pages/auth/interfaces/ISignUpResponse';
import type { ISuccessfulAuthenticationResponse } from '@/pages/auth/interfaces/ISuccessfulAuthenticationResponse';
import type { ApiRequestConfig } from '@/services/api.service';

export interface IAuthService {
  signUp: (
    username: string,
    password: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISignUpResponse>>;
  signIn: (
    username: string,
    password: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISignInResponse>>;
  confirmUser: (
    username: string,
    code: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISuccessfulAuthenticationResponse>>;
  confirmPassword: (
    username: string,
    newPassword: string,
    code: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISuccessfulAuthenticationResponse>>;
  resendConfirmationCode: (
    username: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISuccessfulAuthenticationResponse>>;
  forgotPassword: (
    username: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<ISuccessfulAuthenticationResponse>>;
  refreshToken: (
    username: string,
    refreshToken: string,
    config?: ApiRequestConfig,
  ) => Promise<ISingleResponse<IRefreshSessionResponse>>;
}
