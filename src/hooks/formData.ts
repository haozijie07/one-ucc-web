import { deepClone } from '@/utils/common-fn'
import { ref } from 'vue'

export function useFormData<T>(originData: T) {
  const formData = ref(deepClone(originData))
  function resetFormData() {
    formData.value = deepClone(originData)
  }

  return { formData, resetFormData }
}
