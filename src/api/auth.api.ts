import { httpApi } from '@app/api/http.api';
// import './mocks/auth.api.mock';
import { UserModel } from '@app/domain/UserModel';

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface SecurityCodePayload {
  code: string;
}

export interface NewPasswordData {
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  token?: string;
  user?: UserModel;
}

export const loginVerify = async (): Promise<LoginResponse> => {
  console.log('auth.api#loginVerify: verifying login');
  try {
    const { data } = await httpApi.get('Account/Profile/Basic');
    console.log('auth.api#loginVerify: data', data);
    return data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message || 'An error occurred while verifying login');
  }
};

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> => {
  console.log('auth.api#login: loginPayload', loginPayload);
  return httpApi
    .post<LoginResponse>('Account/Login', { ...loginPayload })
    .then(({ data }) => {
      console.log('auth.api#login: data', data);
      return data;
    })
    .catch((error) => {
      throw new Error(error.message || 'An error occurred while logging in');
    });
};

export const signUp = (signUpData: SignUpRequest): Promise<undefined> =>
  httpApi.post<undefined>('signUp', { ...signUpData }).then(({ data }) => data);

export const resetPassword = (resetPasswordPayload: ResetPasswordRequest): Promise<undefined> =>
  httpApi.post<undefined>('forgotPassword', { ...resetPasswordPayload }).then(({ data }) => data);

export const verifySecurityCode = (securityCodePayload: SecurityCodePayload): Promise<undefined> =>
  httpApi.post<undefined>('verifySecurityCode', { ...securityCodePayload }).then(({ data }) => data);

export const setNewPassword = (newPasswordData: NewPasswordData): Promise<undefined> =>
  httpApi.post<undefined>('setNewPassword', { ...newPasswordData }).then(({ data }) => data);
