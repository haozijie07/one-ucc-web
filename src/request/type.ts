import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export interface BaseRequestConfig {
  loading?: boolean
  originData?: boolean
  dedupe?: boolean
  strictDedupe?: boolean
  __internalHandlers?: { resolve: (value: unknown) => void; reject: (value: unknown) => void }
}

export interface InternalRequestConfig extends BaseRequestConfig, InternalAxiosRequestConfig {}

export interface RequestConfig extends BaseRequestConfig, AxiosRequestConfig {}

export interface RequestResponse extends AxiosResponse {
  config: InternalRequestConfig
}

export interface RequestInstance extends AxiosInstance {
  get: (url: string, config?: RequestConfig) => Promise<any>
  post: (url: string, data?: any, config?: RequestConfig) => Promise<any>
  put: (url: string, data?: any, config?: RequestConfig) => Promise<any>
  delete: (url: string, config?: RequestConfig) => Promise<any>
}
