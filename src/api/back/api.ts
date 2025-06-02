import { uccAxios } from '@/request';

const baseURL = 'http://localhost:3000/api-json';

/** 新增 department */
export async function DepartmentControllerCreate(data: Types.APICreateDepartmentDto, config?: RequestConfig): Promise<Types.APIUpdateDepartmentDto> {
  const url = `/department`;
  return await uccAxios.post(url, data, { ...config });
}

/** 获取所有 department */
export async function DepartmentControllerFindAll( config?: RequestConfig): Promise<Types.APIUpdateDepartmentDto[]> {
  const url = `/department`;
  return uccAxios.get(url, { ...config });
}

/** 根据 id 获取 Department 详情 */
export async function DepartmentControllerFindById(params: { id: string }, config?: RequestConfig): Promise<Types.APIUpdateDepartmentDto> {
  const url = `/department/${params.id}`;
  return uccAxios.get(url, { ...config });
}

/** 修改 department */
export async function DepartmentControllerUpdate(params: { id: string }, data: Types.APIUpdateDepartmentDto, config?: RequestConfig): Promise<Types.APIUpdateDepartmentDto> {
  const url = `/department/${params.id}`;
  return await uccAxios.patch(url, data, { ...config });
}

/** 根据 ID 删除 department */
export async function DepartmentControllerDelete(params: { id: string }, config?: RequestConfig): Promise<Types.APIUpdateDepartmentDto> {
  const url = `/department/${params.id}`;
  return uccAxios.delete(url, { ...config });
}

/** 分页查询 department */
export async function DepartmentControllerPageList(data: Types.APIQueryDto, config?: RequestConfig): Promise<IPageListData<Types.APIUpdateDepartmentDto>> {
  const url = `/department/pageList`;
  return await uccAxios.post(url, data, { ...config });
}

/** 新增 user */
export async function UserControllerCreate(data: Types.APICreateUserDto, config?: RequestConfig): Promise<Types.APIUpdateUserDto> {
  const url = `/user`;
  return await uccAxios.post(url, data, { ...config });
}

/** 获取所有 user */
export async function UserControllerFindAll( config?: RequestConfig): Promise<Types.APIUpdateUserDto[]> {
  const url = `/user`;
  return uccAxios.get(url, { ...config });
}

/** 根据 id 获取 User 详情 */
export async function UserControllerFindById(params: { id: string }, config?: RequestConfig): Promise<Types.APIUpdateUserDto> {
  const url = `/user/${params.id}`;
  return uccAxios.get(url, { ...config });
}

/** 修改 user */
export async function UserControllerUpdate(params: { id: string }, data: Types.APIUpdateUserDto, config?: RequestConfig): Promise<Types.APIUpdateUserDto> {
  const url = `/user/${params.id}`;
  return await uccAxios.patch(url, data, { ...config });
}

/** 根据 ID 删除 user */
export async function UserControllerDelete(params: { id: string }, config?: RequestConfig): Promise<Types.APIUpdateUserDto> {
  const url = `/user/${params.id}`;
  return uccAxios.delete(url, { ...config });
}

/** 分页查询 user */
export async function UserControllerPageList(data: Types.APIQueryDto, config?: RequestConfig): Promise<IPageListData<Types.APIUpdateUserDto>> {
  const url = `/user/pageList`;
  return await uccAxios.post(url, data, { ...config });
}
