import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  LoginRequest,
  NewPasswordData,
  resetPassword,
  ResetPasswordRequest,
  SecurityCodePayload,
  setNewPassword,
  signUp,
  SignUpRequest,
  verifySecurityCode,
} from '@app/api/auth.api';
import { setUser } from '@app/store/slices/userSlice';
import { deleteToken, deleteUser, persistToken, readToken } from '@app/services/localStorage.service';

export interface AuthSlice {
  token: string | null;
}

const initialState: AuthSlice = {
  token: readToken(),
};

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: LoginRequest, { dispatch }) =>
  login(loginPayload)
    .then((res) => {
      console.log('doLogin loginPayload', loginPayload, 'res', res);
      res.user && dispatch(setUser(res.user));
      res.token && persistToken(res.token);
      return res;
    })
    .catch((error) => {
      console.error('doLogin error', error);
      // Throw a new Error instance with a default message if error.message is not available
      throw new Error(error.message || 'An error occurred while logging in');
    }),
);

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
  signUp(signUpPayload),
);

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('auth/doLogout', (payload, { dispatch }) => {
  deleteToken();
  deleteUser();
  dispatch(setUser(null));
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      // @ts-ignore
      state.token = action.payload || null;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
    });
  },
});

export default authSlice.reducer;
