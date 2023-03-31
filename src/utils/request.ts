import axios, {
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
  type AxiosResponse,
  type AxiosError,
  AxiosHeaders,
} from 'axios'
import { utils } from '@/utils'
import { useRequestStore } from '@/stores/request'
import { HttpStatusCode, HttpStatusText } from '@/types/HttpStatusMap'
import type { TokenInfo } from '@/types/common'

export type ApiErrorResult = {
  message: string
  name: string
  data: any
  url: string
}

export type ApiSuccessResult<T = any> = {
  statusCode: number
  success: boolean
  data: T
}

export type ApiResult = ApiSuccessResult | ApiErrorResult

type CustomAxiosHeaders = RawAxiosRequestHeaders & {
  Authorization: string | null
}

const removeRequestStore = (config: AxiosRequestConfig) => {
  const { removeRequest } = useRequestStore()
  // 请求完成从store里移除
  removeRequest(config)
}

const request = axios.create({
  baseURL: window.g.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 60 * 1000,
})

/** 错误处理 */
const handleError = (
  error: Required<AxiosError<ApiErrorResult>> & { __CANCEL__: boolean }
) => {
  if (error.__CANCEL__ || utils.find(error, 'config', 'signal', 'aborted')) {
    return Promise.reject({
      message: utils.find(error, 'config', 'signal', 'reason'),
      name: error.name,
      data: null,
      url: error.config.url,
    })
  }
  if (error.response) {
    const { status, data, config } = error.response
    const code = HttpStatusCode[status] as keyof typeof HttpStatusText
    const errorResult: ApiErrorResult & { response: AxiosResponse } = {
      name: error.name,
      message: data?.message || HttpStatusText[code],
      data,
      url: error.config.url as string,
      response: error.response,
    }

    if (status === HttpStatusCode.UNAUTHORIZED) {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = data?.data?.url
    } else if (status === HttpStatusCode.FORBIDDEN) {
      // 5秒后重定向到统一认证
      utils
        .delay(5000)
        .then(() => (window.location.href = data?.url || data?.data?.url))
    }
    removeRequestStore(config)
    return Promise.reject(errorResult)
  }
}

/** 请求拦截器 */
request.interceptors.request.use((config) => {
  const tokenInfo = utils.parseJSON<TokenInfo>(
    localStorage.getItem('tokenInfo')
  )
  if (config.headers && tokenInfo) {
    ;(
      config.headers as CustomAxiosHeaders
    ).Authorization = `${tokenInfo.token_type} ${tokenInfo.access_token}`
  }
  try {
    const { addRequest } = useRequestStore()
    addRequest(config)
  } catch (error) {
    console.error('request error: ', error)
  }
  return config
})

/** 响应拦截器 */
request.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResult>) => {
    removeRequestStore(response.config)
    return response
  },
  handleError
)

/** 封装增删改查方法 */
type WrapperApiResult<T = object> = {
  data: T
  error: ApiErrorResult | null
  requestHeaders: AxiosHeaders
  responseHeaders: AxiosHeaders
}

class Http {
  async capture<T>(
    request: Promise<AxiosResponse<ApiSuccessResult<T>>>
  ): Promise<WrapperApiResult<T>> {
    try {
      const response = await request
      return {
        data: response.data.data,
        error: null,
        requestHeaders: response.config.headers as AxiosHeaders,
        responseHeaders: response.headers as AxiosHeaders,
      }
    } catch (error) {
      const { response, ...errorData } = error as {
        response: AxiosResponse
      } & ApiErrorResult
      return {
        data: undefined,
        error: errorData,
        requestHeaders: response.config.headers as AxiosHeaders,
        responseHeaders: response.headers as AxiosHeaders,
      } as WrapperApiResult<any>
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.get(url, config))
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.post(url, data, config))
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.post(url, data, config))
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request.get(url, config))
  }

  async request<T>(config: AxiosRequestConfig): Promise<WrapperApiResult<T>> {
    return this.capture<T>(request(config))
  }
}

export const http = new Http()
