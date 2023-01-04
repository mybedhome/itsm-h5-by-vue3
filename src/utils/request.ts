import axios, { AxiosHeaders } from 'axios';
import { useLoginInfoStore } from '@/stores/loginInfo';
import { utils } from '@/utils';
import { useRequestStore } from '@/stores/request';
import { HttpStatusCode, HttpStatusText } from '@/types/HttpStatusMap';
export type ApiErrorResult = {
  message: string;
  name: string;
  data: any;
};

type CustomAxiosHeaders = AxiosHeaders & {
  Authorization: string;
};

export const http = axios.create({
  baseURL: window.g.VUE_APP_BASE_API + '/api',
  withCredentials: true,
  timeout: 60 * 1000,
});

http.interceptors.request.use((config) => {
  if (config.headers) {
    (config.headers as CustomAxiosHeaders).Authorization =
      useLoginInfoStore().loginInfo.token;
  }
  const { addRequest } = useRequestStore();
  addRequest(config);
  return config;
});

http.interceptors.response.use(
  (response) => {
    const { removeRequest } = useRequestStore();
    removeRequest(response.config);
    return response.data;
  },
  (error) => {
    if (error.__CANCEL__ || error.config.signal.aborted) {
      return Promise.reject({
        message: error.config.signal.reason,
        name: error.name,
        data: null,
      });
    }
    if (error.response) {
      const { status, data } = error.response;
      const code = HttpStatusCode[status] as keyof typeof HttpStatusText;
      const errorResult: ApiErrorResult = {
        name: error.name,
        message: data?.message || HttpStatusText[code],
        data,
      };

      if (status === HttpStatusCode.UNAUTHORIZED) {
        window.location.href = data?.data?.url;
      } else if (status === HttpStatusCode.FORBIDDEN) {
        // 5秒后重定向到统一认证
        utils.delay(5000).then(() => (window.location.href = data?.url));
      }
      return Promise.reject(errorResult);
    }
  }
);
