import axios from 'axios';

const instance = axios.create({ baseURL: 'http://135.125.190.40:3333/api' });

export default instance;
