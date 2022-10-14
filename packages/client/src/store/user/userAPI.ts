import axios from 'utils/api';
import API from 'constants/api';
import { User } from 'types/user';
import { Loan } from 'types/loan';

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
}

export const fetchUserProfileRequest = () => axios.get<User>(API.user.profile);
export const fetchUserLoansRequest = () => axios.get<Loan[]>(API.user.loans);
export const registerUserRequest = (data: RegisterUserData) => axios.post(API.user.register, data);
