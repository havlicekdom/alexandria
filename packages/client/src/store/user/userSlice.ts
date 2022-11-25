import { createSlice } from '@reduxjs/toolkit';
import { messages } from 'translations';
import { Loan } from 'types/loan';
import { Role } from 'types/role';
import { User } from 'types/user';
import { createCustomAsyncThunk } from 'utils/thunks';
import { RootState } from '../store';
import {
  fetchUserProfileRequest,
  fetchUserLoansRequest,
  RegisterOrUpdateUserData,
  registerUserRequest,
  updateUserRequest,
  forgottenPasswordRequest,
  ResetPasswordData,
  resetPasswordRequest,
} from './userAPI';

export interface UserState {
  user: User;
  loans: Loan[];
}

const initialState: UserState = {
  user: {
    id: '',
    username: '',
    email: '',
    role: Role.User,
  },
  loans: [],
};

export const getUserProfile = createCustomAsyncThunk(
  'user/getProfile',
  async () => {
    const response = await fetchUserProfileRequest();

    return {
      user: response.data,
      message: messages.signInSuccess,
    };
  },
);

export const getUserLoans = createCustomAsyncThunk(
  'user/getLoans',
  async () => {
    const response = await fetchUserLoansRequest();

    return {
      loans: response.data,
      message: null,
    };
  },
);

export const registerUser = createCustomAsyncThunk(
  'user/register',
  async (userData: RegisterOrUpdateUserData) => {
    await registerUserRequest(userData);

    return {
      message: messages.registerSuccess,
    };
  },
);

export const updateUser = createCustomAsyncThunk(
  'user/update',
  async ({
    userId,
    userData,
  }: {
    userId: string,
    userData: RegisterOrUpdateUserData,
  }) => {
    await updateUserRequest(userId, userData);

    return {
      message: messages.updateSuccess,
    };
  },
);

export const forgottenPassword = createCustomAsyncThunk(
  'user/forgottenPassword',
  async (userData: { email: string }) => {
    await forgottenPasswordRequest(userData);

    return {
      message: messages.forgottenPasswordSuccess,
    };
  },
);

export const resetPassword = createCustomAsyncThunk(
  'user/resetPassword',
  async (userData: ResetPasswordData) => {
    await resetPasswordRequest(userData);

    return {
      message: messages.resetPasswordSuccess,
    };
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserLoans.fulfilled, (state, action) => {
        state.loans = action.payload.loans;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoans = (state: RootState) => state.user.loans;

export default userSlice.reducer;
