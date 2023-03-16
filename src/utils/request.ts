import axios, {
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
  type AxiosResponse,
  type AxiosInstance,
} from 'axios';
import { utils } from '@/utils';
import { useRequestStore } from '@/stores/request';
import { HttpStatusCode, HttpStatusText } from '@/types/HttpStatusMap';
import type { TokenInfo } from '@/types/common';

export type ApiErrorResult = {
  message: string;
  name: string;
  data: any;
  url: string;
};

export type ApiSuccessResult<T = any> = {
  statusCode: number;
  success: boolean;
  data: T;
};

export type ApiResult = ApiSuccessResult | ApiErrorResult;

type CustomAxiosHeaders = RawAxiosRequestHeaders & {
  Authorization: string | null;
};

const request = axios.create({
  baseURL: window.g.VUE_APP_BASE_API + '/api',
  withCredentials: true,
  timeout: 60 * 1000,
});

/** 错误处理 */
const handleError = (error: any) => {
  if (error.__CANCEL__ || (error.config && error.config?.signal?.aborted)) {
    return Promise.reject({
      message: error.config.signal.reason,
      name: error.name,
      data: null,
      url: error.config.url,
    });
  }
  if (error.response) {
    const { status, data } = error.response;
    const code = HttpStatusCode[status] as keyof typeof HttpStatusText;
    const errorResult: ApiErrorResult = {
      name: error.name,
      message: data?.message || HttpStatusText[code],
      data,
      url: error.config.url,
    };

    if (status === HttpStatusCode.UNAUTHORIZED) {
      if (!sessionStorage.getItem('redirect')) {
        window.location.href = data?.data?.url;
      }
    } else if (status === HttpStatusCode.FORBIDDEN) {
      // 5秒后重定向到统一认证
      utils.delay(5000).then(() => (window.location.href = data?.url));
    }
    console.log('errorResult', errorResult);
    return Promise.reject(errorResult);
  }
};

/** 请求拦截器 */
request.interceptors.request.use((config) => {
  const tokenInfo = utils.parseJSON<TokenInfo>(
    localStorage.getItem('tokenInfo')
  );
  if (config.headers && tokenInfo) {
    (
      config.headers as CustomAxiosHeaders
    ).Authorization = `${tokenInfo.token_type} ${tokenInfo.access_token}`;
  }
  try {
    const { addRequest } = useRequestStore();
    addRequest(config);
  } catch (error) {
    console.log('error', error);
  }
  return config;
});

/** 响应拦截器 */
request.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResult>) => {
    console.log('response.data.data', response.data.data);
    const { removeRequest } = useRequestStore();
    // 请求完成从store里移除
    removeRequest(response.config);
    return response.data.data;
  },
  handleError
);

/** 封装增删改查方法 */
type WrapperApiResult<T> = { data: T; error: ApiErrorResult | null };
class Http {
  async capture<T>(request: Promise<T>): Promise<WrapperApiResult<T>> {
    try {
      return { data: await request, error: null };
    } catch (error) {
      return { data: null, error } as { data: T; error: ApiErrorResult };
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.get(url, config));
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.post(url, data, config));
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.post(url, data, config));
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.get(url, config));
  }

  async request<T>(config: AxiosRequestConfig): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request(config));
  }
}

export const http = new Http();
