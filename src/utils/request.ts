import axios, {
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
  type AxiosResponse,
} from 'axios';
import { useLoginInfoStore } from '@/stores/loginInfo';
import { utils } from '@/utils';
import { useRequestStore } from '@/stores/request';
import { HttpStatusCode, HttpStatusText } from '@/types/HttpStatusMap';
export type ApiErrorResult = {
  message: string;
  name: string;
  data: any;
};

export type ApiSuccessResult<T = any> = {
  statusCode: number;
  success: boolean;
  data: T;
};

type CustomAxiosHeaders = RawAxiosRequestHeaders & {
  Authorization: string;
};

const request = axios.create({
  baseURL: window.g.VUE_APP_BASE_API + '/api',
  withCredentials: true,
  timeout: 60 * 1000,
});

request.interceptors.request.use((config) => {
  if (config.headers) {
    (config.headers as CustomAxiosHeaders).Authorization =
      useLoginInfoStore().loginInfo.token;
  }
  const { addRequest } = useRequestStore();
  addRequest(config);
  return config;
});

request.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResult>) => {
    const { removeRequest } = useRequestStore();
    // 请求完成从store里移除
    removeRequest(response.config);
    return response.data.data;
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

class Http {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config);
  }
  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return request.post(url, data, config);
  }
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return request.post(url, data, config);
  }
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config);
  }
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    return request(config);
  }
}

export const http = new Http();
