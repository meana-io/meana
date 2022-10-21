import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://vps-5c7e69c7.vps.ovh.net:3333/api',
});

export default instance;
