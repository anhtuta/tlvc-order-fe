import axios from 'axios';
import queryString from 'query-string';

const cleanParam = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });
  return obj;
};

const axiosClient = axios.create({
  // baseURL: window.location.protocol + '//' + window.location.hostname + '/tlvc-api', // local
  baseURL: 'http://localhost:8888/',
  // baseURL: 'https://xuongducdongyyen.com/tlvc-api', // product
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(cleanParam(params))
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here...
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
