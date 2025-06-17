import { uccAxios } from '@/request'

const baseURL = 'http://localhost:3000/api/docs/common-json'

/** 获取通用下拉选项列表 */
export async function OptionControllerGetOptions(
  params: { type: OptionsType },
  config?: RequestConfig,
): Promise<APIGetOptionResponseDto[]> {
  const url = `/api/common/options/${params.type}`
  return uccAxios.get(url, { ...config })
}

/** 获取字典下拉选项列表 */
export async function OptionControllerGetDictOptions(
  params: { dictCode: string },
  config?: RequestConfig,
): Promise<APIGetOptionResponseDto[]> {
  const url = `/api/common/options/dictOptions/${params.dictCode}`
  return uccAxios.get(url, { ...config })
}
