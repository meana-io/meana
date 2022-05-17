import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api',
});

api.defaults.headers.common.Authorization = 'AUTH TOKEN';
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
