import axios from 'utils/api';
import API from 'constants/api';

export const loginUserRequest = (
  username: string,
  password: string,
) => axios.post(API.login, {
  username,
  password,
});
export const logoutUserRequest = () => axios.delete(API.logout);
