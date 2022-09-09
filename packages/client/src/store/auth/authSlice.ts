import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { messages } from 'translations';
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

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserRequest(username, password);

      return {
        token: response.data.access_token,
        message: messages.signInSuccess,
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (!response) {
        throw error;
      }

      return rejectWithValue(response.data);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserRequest();

      return {
        data: response.data,
        message: messages.signOutSuccess,
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (!response) {
        throw error;
      }

      return rejectWithValue(response.data);
    }
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
