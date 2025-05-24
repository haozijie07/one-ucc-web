import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

declare global {
  interface BaseRequestConfig {
    loading?: boolean
    originData?: boolean
    dedupe?: boolean
    strictDedupe?: boolean
    __internalHandlers?: { resolve: (value: unknown) => void; reject: (value: unknown) => void }
  }

  interface InternalRequestConfig extends BaseRequestConfig, InternalAxiosRequestConfig {}

  interface RequestConfig extends BaseRequestConfig, AxiosRequestConfig {}

  interface RequestResponse extends AxiosResponse {
    config: InternalRequestConfig
  }

  interface RequestInstance extends AxiosInstance {
    get: (url: string, config?: RequestConfig) => Promise<any>
    post: (url: string, data?: any, config?: RequestConfig) => Promise<any>
    put: (url: string, data?: any, config?: RequestConfig) => Promise<any>
    delete: (url: string, config?: RequestConfig) => Promise<any>
  }
}

export {}
