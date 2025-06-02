import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { getPending, addPending, removePending, hasPending } from './requestQueue'
import { ElMessageBox } from 'element-plus'

export function createAxiosInstance(config: AxiosRequestConfig): RequestInstance {
  const instance = axios.create(config)

  instance.interceptors.request.use(
    (config: InternalRequestConfig) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      if (config.loading) {
        // ...
      }

      if (config.strictDedupe) {
        const existing = hasPending(config)
        if (existing) {
          // ❌ 中断后续请求，不共享已有的 Promise
          const cancelError = new axios.Cancel(`重复的请求: ${config.url}`)
          ;(cancelError as any).config = config

          return Promise.reject(cancelError)
        }

        addPending(config)
      }

      if (config.dedupe) {
        const existing = getPending(config)
        if (existing) {
          // ⚠️ 返回一个特殊 Promise，用于中断 axios 请求流程并共享结果
          return Promise.reject({ __dedupe__: true, existing, config })
        }

        // 创建共享用 Promise
        const deferred = new Promise((resolve, reject) => {
          config.__internalHandlers = { resolve, reject }
        })

        addPending(config, deferred)
      }

      return config
    },
    (error) => Promise.reject(error),
  )

  instance.interceptors.response.use(
    (response: RequestResponse) => {
      const config = response.config

      if (config.loading) {
        //...
      }

      if (config.originData) {
        if (config.dedupe) {
          config.__internalHandlers?.resolve?.(response.data)
          removePending(config)
        }

        return response.data
      } else {
        const { code, data, message } = response.data
        if (code === 200) {
          if (config.dedupe) {
            config.__internalHandlers?.resolve?.(data)
          }

          removePending(config)
          return data
        } else {
          if (config.dedupe) {
            config.__internalHandlers?.resolve?.(null)
          }
          ElMessageBox({
            title: '请求异常',
            type: 'error',
            message,
          })
          removePending(config)
          // 自定义错误处理
          return null
        }
      }
    },
    (error) => {
      const config: InternalRequestConfig = error.config || {}

      if (error?.__dedupe__ && error.existing) {
        return error.existing
      }

      if (config.strictDedupe && axios.isCancel(error)) {
        console.warn('请求重复被取消：', error.message)
        return null
      }

      if (config.loading) {
        // ...
      }

      if (config.dedupe) {
        config.__internalHandlers?.reject?.(error)
      }

      removePending(config)

      return Promise.reject(error)
    },
  )

  instance.get = (url: string, config?: RequestConfig) => {
    return instance.request({ ...config, url, method: 'get' })
  }

  instance.post = (url: string, data: any, config?: RequestConfig) => {
    return instance.request({ ...config, url, method: 'post', data })
  }

  instance.put = (url: string, data: any, config?: RequestConfig) => {
    return instance.request({ ...config, url, method: 'put', data })
  }

  instance.delete = (url: string, config?: RequestConfig) => {
    return instance.request({ ...config, url, method: 'delete' })
  }

  return instance
}
