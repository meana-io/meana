import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

const getBearerToken = () => {
  return (
    localStorage.getItem('token') ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwic3ViIjoiODJiYjFjOGItYmIxOC00ZTMyLTg2ZTctNzJlOTZhZGUyNWY0IiwiaWF0IjoxNjczMDMzMTU1LCJleHAiOjE2NzMwMzY3NTV9.2cN4eBl-yGAo0h3NL8t3vI9QCnv4bKPGK6zk9tIYuSU'
  );
};

instance.interceptors.response.use((config) => config.data);
instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${getBearerToken()}`;

  return config;
});

export const api = {
  get: <T>(url: string, params?: object) => instance.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => instance.post<T>(url, data),
  patch: <T>(url: string, data: any) => instance.patch<T>(url, data),
  delete: <T>(url: string) => instance.delete<T>(url),
};
