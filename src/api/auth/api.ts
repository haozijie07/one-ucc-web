import { uccAxios } from '@/request';

const baseURL = 'http://localhost:3000/api/docs/auth-json';

/** 登录 */
export async function AuthControllerLogin(data: APILoginDto, config?: RequestConfig): Promise<APIResponseLoginDto> {
  const url = `/api/auth/login`;
  return await uccAxios.post(url, data, { ...config });
}
