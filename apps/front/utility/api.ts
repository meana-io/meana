import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

instance.interceptors.response.use((config) => config.data);

export const api = {
  get: <T>(url: string, params?: object) => instance.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => instance.post<T>(url, data),
  patch: <T>(url: string, data: any) => instance.patch<T>(url, data),
  delete: <T>(url: string) => instance.delete<T>(url),
};
