import axios from 'axios';

import host from '../_config/host';

const api = axios.create({
  baseURL: `https://${host.WEBHOST}`,
  //baseURL: `http://${host.LOCALHOST}:${host.PORT}`,
});

export default api;
