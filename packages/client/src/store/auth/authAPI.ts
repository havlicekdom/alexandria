import axios from 'utils/api';
import API from 'constants/api';

type LoginUserResponse = {
  access_token: string;
}

export const loginUserRequest = (
  username: string,
  password: string,
) => axios.post<LoginUserResponse>(API.login, {
  username,
  password,
});
export const logoutUserRequest = () => axios.delete(API.logout);
