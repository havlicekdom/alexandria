import axios from 'utils/api';
import API from 'constants/api';

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
}

export const fetchUserProfileRequest = () => axios.get(API.userProfile);
export const registerUserRequest = (data: RegisterUserData) => axios.post(API.register, data);
