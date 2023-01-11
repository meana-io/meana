import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

instance.interceptors.response.use((config) => config.data);

instance.interceptors.request.use(
  (config) => {
    config.headers[
      'Authorization'
    ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwic3ViIjoiODJiYjFjOGItYmIxOC00ZTMyLTg2ZTctNzJlOTZhZGUyNWY0IiwiaWF0IjoxNjczNDYzMjI0LCJleHAiOjE2NzM0NjY4MjR9.t3mqDdEM-80I2UermlQjNu7Qmnas8o6tZRz6y-NzRQk`;
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
