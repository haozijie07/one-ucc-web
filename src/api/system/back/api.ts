import { uccAxios } from '@/request';

const baseURL = 'http://localhost:3000/api/docs/system-json';

/** 新增 department */
export async function DepartmentControllerCreate(data: APICreateDepartmentDto, config?: RequestConfig): Promise<APIResponseDepartmentDto> {
  const url = `/api/department`;
  return await uccAxios.post(url, data, { ...config });
}

/** 获取所有 department */
export async function DepartmentControllerFindAll( config?: RequestConfig): Promise<APIResponseDepartmentDto[]> {
  const url = `/api/department`;
  return uccAxios.get(url, { ...config });
}

/** 根据 id 获取 Department 详情 */
export async function DepartmentControllerFindById(params: { id: string }, config?: RequestConfig): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`;
  return uccAxios.get(url, { ...config });
}

/** 修改 department */
export async function DepartmentControllerUpdate(params: { id: string }, data: APIUpdateDepartmentDto, config?: RequestConfig): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`;
  return await uccAxios.patch(url, data, { ...config });
}

/** 根据 ID 删除 department */
export async function DepartmentControllerDelete(params: { id: string }, config?: RequestConfig): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`;
  return uccAxios.delete(url, { ...config });
}

/** 分页查询 department */
export async function DepartmentControllerPageList(data: APIQueryDto, config?: RequestConfig): Promise<IPageListData<APIResponseDepartmentDto>> {
  const url = `/api/department/pageList`;
  return await uccAxios.post(url, data, { ...config });
}

/** 新增 user */
export async function UserControllerCreate(data: APICreateUserDto, config?: RequestConfig): Promise<APIResponseUserDto> {
  const url = `/api/user`;
  return await uccAxios.post(url, data, { ...config });
}

/** 获取所有 user */
export async function UserControllerFindAll( config?: RequestConfig): Promise<APIResponseUserDto[]> {
  const url = `/api/user`;
  return uccAxios.get(url, { ...config });
}

/** 根据 id 获取 User 详情 */
export async function UserControllerFindById(params: { id: string }, config?: RequestConfig): Promise<APIResponseUserDto> {
  const url = `/api/user/${params.id}`;
  return uccAxios.get(url, { ...config });
}

/** 修改 user */
export async function UserControllerUpdate(params: { id: string }, data: APIUpdateUserDto, config?: RequestConfig): Promise<APIResponseUserDto> {
  const url = `/api/user/${params.id}`;
  return await uccAxios.patch(url, data, { ...config });
}

/** 根据 ID 删除 user */
export async function UserControllerDelete(params: { id: string }, config?: RequestConfig): Promise<APIResponseUserDto> {
  const url = `/api/user/${params.id}`;
  return uccAxios.delete(url, { ...config });
}

/** 分页查询 user */
export async function UserControllerPageList(data: APIQueryDto, config?: RequestConfig): Promise<IPageListData<APIResponseUserDto>> {
  const url = `/api/user/pageList`;
  return await uccAxios.post(url, data, { ...config });
}
