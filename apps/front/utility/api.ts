import axios from 'axios';
import { getToken } from './token';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

instance.interceptors.response.use((config) => config.data);

instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) => instance.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => instance.post<T>(url, data),
  patch: <T>(url: string, data: any) => instance.patch<T>(url, data),
  delete: <T>(url: string) => instance.delete<T>(url),
};
