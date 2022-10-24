import axios from 'utils/api';
import API from 'constants/api';
import { User } from 'types/user';
import { Loan } from 'types/loan';

export type RegisterOrUpdateUserData = {
  username: string;
  email: string;
  password: string;
}

export const fetchUserProfileRequest = () => axios.get<User>(API.user.profile);
export const fetchUserLoansRequest = () => axios.get<Loan[]>(API.user.loans);
export const registerUserRequest = (
  data: RegisterOrUpdateUserData,
) => axios.post(API.user.register, data);
export const updateUserRequest = (
  userId: string,
  data: RegisterOrUpdateUserData,
) => axios.patch(API.user.update(userId), data);
export const resetPasswordRequest = (
  data: { email: string },
) => axios.patch(API.user.resetPassword, data);
