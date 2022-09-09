import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { messages } from 'translations';
import { User } from 'types/user';
import { RootState } from '../store';
import { fetchUserProfileRequest, RegisterUserData, registerUserRequest } from './userAPI';

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    username: '',
    email: '',
  },
};

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfileRequest();

      return {
        user: response.data,
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

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      await registerUserRequest(userData);

      return {
        message: messages.registerSuccess,
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

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
