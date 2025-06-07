import { uccAxios } from '@/request';

const baseURL = 'http://localhost:3000/api/docs/common-json';

/** 获取通用下拉选项列表 */
export async function OptionControllerGetOptions(query: { type: string }, config?: RequestConfig): Promise<APIGetOptionResponseDto[]> {
  const url = `/api/common/options`;
  return uccAxios.get(url, { ...config });
}
