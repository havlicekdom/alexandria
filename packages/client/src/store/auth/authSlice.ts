import { createSlice } from '@reduxjs/toolkit';
import { messages } from 'translations';
import { createCustomAsyncThunk } from 'utils/thunks';
import { RootState } from '../store';
import {
  loginUserRequest,
  logoutUserRequest,
} from './authAPI';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
};

export const login = createCustomAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string, password: string }) => {
    const response = await loginUserRequest(username, password);

    return {
      token: response.data.access_token,
      message: messages.signInSuccess,
    };
  },
);

export const logout = createCustomAsyncThunk(
  'auth/logout',
  async () => {
    const response = await logoutUserRequest();

    return {
      data: response.data,
      message: messages.signOutSuccess,
    };
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = initialState.token;
        state.isLoggedIn = false;
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
