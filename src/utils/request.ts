import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useLoginInfoStore } from '@/stores/loginInfo';
import { utils } from '@/utils';
import { useRequestStore } from '@/stores/request';

type RequestError = Error & {
  data: any;
};

export const http = axios.create({
  baseURL: window.g.VUE_APP_BASE_API + '/api',
  withCredentials: true,
  timeout: 60 * 1000,
});

http.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Authorization'] = useLoginInfoStore().loginInfo.token;
    }
    const { addRequest } = useRequestStore();
    addRequest(config);
    return config;
  },
  (error) => {
    console.log('error is ', error);
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    console.log('response', response);
    const { removeRequest } = useRequestStore();
    removeRequest(response.config);
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        window.location.href = data.data.url;
      } else if (status >= 500) {
        // throw new Error('Server is not response');
        return Promise.reject(new Error(data));
        // return { code: 500, success: false };
      }
    }
  }
);
