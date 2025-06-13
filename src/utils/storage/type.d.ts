import { Ref } from 'vue'

declare global {
  interface Serializer<T> {
    read: (raw: string) => T
    write: (val: T) => string
  }

  interface UseAppStorageOptions<T> {
    defaultValue?: T
    namespace?: string
    expireIn?: number
    serializer?: Serializer<T>
  }

  interface StorageResult<T> {
    state: Ref<T>
    remove: () => void
    isExpired: () => boolean
  }
}

export {}
