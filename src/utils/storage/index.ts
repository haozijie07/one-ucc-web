// utils/storage/useAppStorage.ts
import { ref, watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'

const memoryCache = new Map<string, any>()

export function useAppStorage<T>(
  key: string,
  options: UseAppStorageOptions<T> = {},
): StorageResult<T> {
  const {
    defaultValue = undefined,
    namespace = 'app',
    expireIn,
    serializer = {
      read: JSON.parse,
      write: JSON.stringify,
    },
  } = options

  const storageKey = `${namespace}:${key}`
  const metaKey = `${namespace}:__meta__:${key}`

  const isExpired = (): boolean => {
    if (!expireIn) return false
    const expiredAt = parseInt(localStorage.getItem(metaKey) || '0', 10)
    return Date.now() > expiredAt
  }

  if (isExpired()) {
    localStorage.removeItem(storageKey)
    localStorage.removeItem(metaKey)
    memoryCache.delete(storageKey)
  }

  // 尝试读取内存缓存
  if (memoryCache.has(storageKey)) {
    const cached = memoryCache.get(storageKey)
    return {
      state: ref(cached),
      remove: () => {
        memoryCache.delete(storageKey)
        localStorage.removeItem(storageKey)
        localStorage.removeItem(metaKey)
      },
      isExpired,
    }
  }

  const raw = localStorage.getItem(storageKey)
  let parsed: T = defaultValue as T

  try {
    if (raw !== null) {
      parsed = serializer.read(raw)
    }
  } catch {
    parsed = defaultValue as T
  }

  const state = useStorage<T>(storageKey, parsed, undefined, {
    serializer: {
      read: serializer.read,
      write: serializer.write,
    },
  })

  watchEffect(() => {
    memoryCache.set(storageKey, state.value)
  })

  if (expireIn) {
    const expiredAt = Date.now() + expireIn
    localStorage.setItem(metaKey, expiredAt.toString())
  }

  const remove = () => {
    state.value = defaultValue as T
    memoryCache.delete(storageKey)
    localStorage.removeItem(storageKey)
    localStorage.removeItem(metaKey)
  }

  return { state, remove, isExpired }
}
