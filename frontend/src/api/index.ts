import axios, { AxiosRequestConfig } from 'axios';
import { ErrorCode } from 'consts/errors';

const getToken = () => {
  return localStorage.getItem('token');
};
const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};
const removeToken = () => {
  localStorage.removeItem('token');
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const injectTokenInterceptor = (config: AxiosRequestConfig) => {
  // Insert token
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

axiosInstance.interceptors.request.use(injectTokenInterceptor);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Refresh token if expired
    if (
      error.response?.status === 401 &&
      error.response.data.error?.code === ErrorCode.TOKEN_EXPIRED
    ) {
      const currentToken = getToken();
      // Prevent refreshing token when logged out
      if (!currentToken) return Promise.reject(error);
      removeToken();

      const response = await axiosInstance.post('refreshToken', null, {
        withCredentials: true,
      });

      storeToken(response.data.token);
      return axiosInstance.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

const get = async (endpoint: string) => {
  // Remove redundant trailing slash
  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);

  const response = await axiosInstance.get(endpoint);
  return response.data;
};

const post = async (
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
) => {
  // Remove redundant trailing slash
  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);

  const response = await axiosInstance.post(endpoint, data, config);
  return response.data;
};

export const api = {
  get,
  post,
};
