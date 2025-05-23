import type { RequestConfig } from './type'

const pendingMap = new Map<string, Promise<any>>()

export function generateRequestKey(config: RequestConfig): string {
  const { url, method, params, data } = config

  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

export function addPending(config: RequestConfig, request?: Promise<any> | any) {
  const key = generateRequestKey(config)
  pendingMap.set(key, request)
}

export function removePending(config: RequestConfig) {
  const key = generateRequestKey(config)
  if (pendingMap.has(key)) {
    pendingMap.delete(key)
  }
}

export function getPending(config: RequestConfig) {
  const key = generateRequestKey(config)
  return pendingMap.get(key)
}

export function hasPending(config: RequestConfig) {
  const key = generateRequestKey(config)
  return pendingMap.has(key)
}
