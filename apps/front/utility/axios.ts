import axios from 'axios';

const api = axios.create({ baseURL: 'http://135.125.190.40:3333/api' });

export default api;
