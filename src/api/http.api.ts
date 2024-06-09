import axios, { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

  // It is important to set withCredentials to true to allow the browser to send cookies and receive cookies from the server.
  withCredentials: true,
});

httpApi.interceptors.request.use((config) => {
  // config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` };

  return config;
});

httpApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log('http.api.ts: error', error);
    throw new ApiError<ApiErrorData>(error.response?.data?.message || error.message, error.response?.data);
  },
);

export interface ApiErrorData {
  message: string;
}
