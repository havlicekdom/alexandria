import axios from 'axios';
import { AppStore } from 'store/store';

const axiosInstance = axios.create();

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;

    config.headers = {
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosInstance;
