import { uccAxios } from '@/request'

const baseURL = 'http://localhost:3000/api/docs/system-json'

/** 新增 department */
export async function DepartmentControllerCreate(
  data: APICreateDepartmentDto,
  config?: RequestConfig,
): Promise<APIResponseDepartmentDto> {
  const url = `/api/department`
  return await uccAxios.post(url, data, { ...config })
}

/** 获取所有 department */
export async function DepartmentControllerFindAll(
  config?: RequestConfig,
): Promise<APIResponseDepartmentDto[]> {
  const url = `/api/department`
  return uccAxios.get(url, { ...config })
}

/** 根据 id 获取 Department 详情 */
export async function DepartmentControllerFindById(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`
  return uccAxios.get(url, { ...config })
}

/** 修改 department */
export async function DepartmentControllerUpdate(
  params: { id: string },
  data: APIUpdateDepartmentDto,
  config?: RequestConfig,
): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`
  return await uccAxios.patch(url, data, { ...config })
}

/** 根据 ID 删除 department */
export async function DepartmentControllerDelete(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponseDepartmentDto> {
  const url = `/api/department/${params.id}`
  return uccAxios.delete(url, { ...config })
}

/** 分页查询 department */
export async function DepartmentControllerPageList(
  data: APIQueryDto,
  config?: RequestConfig,
): Promise<IPageListData<APIResponseDepartmentDto>> {
  const url = `/api/department/pageList`
  return await uccAxios.post(url, data, { ...config })
}

/** 新增 user */
export async function UserControllerCreate(
  data: APICreateUserDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/user`
  return await uccAxios.post(url, data, { ...config })
}

/** 获取所有 user */
export async function UserControllerFindAll(config?: RequestConfig): Promise<APIResponseUserDto[]> {
  const url = `/api/user`
  return uccAxios.get(url, { ...config })
}

/** 根据 id 获取 User 详情 */
export async function UserControllerFindById(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponseUserDto> {
  const url = `/api/user/${params.id}`
  return uccAxios.get(url, { ...config })
}

/** 修改 user */
export async function UserControllerUpdate(
  params: { id: string },
  data: APIUpdateUserDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/user/${params.id}`
  return await uccAxios.patch(url, data, { ...config })
}

/** 根据 ID 删除 user */
export async function UserControllerDelete(
  params: { id: string },
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/user/${params.id}`
  return uccAxios.delete(url, { ...config })
}

/** 分页查询 user */
export async function UserControllerPageList(
  data: APIQueryDto,
  config?: RequestConfig,
): Promise<IPageListData<APIResponseUserDto>> {
  const url = `/api/user/pageList`
  return await uccAxios.post(url, data, { ...config })
}

/** 新增 position */
export async function PositionControllerCreate(
  data: APICreatePositionDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/position`
  return await uccAxios.post(url, data, { ...config })
}

/** 获取所有 position */
export async function PositionControllerFindAll(
  config?: RequestConfig,
): Promise<APIResponsePositionDto[]> {
  const url = `/api/position`
  return uccAxios.get(url, { ...config })
}

/** 根据 id 获取 Position 详情 */
export async function PositionControllerFindById(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponsePositionDto> {
  const url = `/api/position/${params.id}`
  return uccAxios.get(url, { ...config })
}

/** 修改 position */
export async function PositionControllerUpdate(
  params: { id: string },
  data: APIUpdatePositionDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/position/${params.id}`
  return await uccAxios.patch(url, data, { ...config })
}

/** 根据 ID 删除 position */
export async function PositionControllerDelete(
  params: { id: string },
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/position/${params.id}`
  return uccAxios.delete(url, { ...config })
}

/** 分页查询 position */
export async function PositionControllerPageList(
  data: APIQueryDto,
  config?: RequestConfig,
): Promise<IPageListData<APIResponsePositionDto>> {
  const url = `/api/position/pageList`
  return await uccAxios.post(url, data, { ...config })
}

/** 新增 dictType */
export async function DictTypeControllerCreate(
  data: APICreateDictTypeDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictType`
  return await uccAxios.post(url, data, { ...config })
}

/** 获取所有 dictType */
export async function DictTypeControllerFindAll(
  config?: RequestConfig,
): Promise<APIResponseDictTypeDto[]> {
  const url = `/api/dictType`
  return uccAxios.get(url, { ...config })
}

/** 根据 id 获取 DictType 详情 */
export async function DictTypeControllerFindById(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponseDictTypeDto> {
  const url = `/api/dictType/${params.id}`
  return uccAxios.get(url, { ...config })
}

/** 修改 dictType */
export async function DictTypeControllerUpdate(
  params: { id: string },
  data: APIUpdateDictTypeDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictType/${params.id}`
  return await uccAxios.patch(url, data, { ...config })
}

/** 根据 ID 删除 dictType */
export async function DictTypeControllerDelete(
  params: { id: string },
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictType/${params.id}`
  return uccAxios.delete(url, { ...config })
}

/** 分页查询 dictType */
export async function DictTypeControllerPageList(
  data: APIQueryDto,
  config?: RequestConfig,
): Promise<IPageListData<APIResponseDictTypeDto>> {
  const url = `/api/dictType/pageList`
  return await uccAxios.post(url, data, { ...config })
}

/** 新增 dictItem */
export async function DictItemControllerCreate(
  data: APICreateDictItemDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictItem`
  return await uccAxios.post(url, data, { ...config })
}

/** 获取所有 dictItem */
export async function DictItemControllerFindAll(
  config?: RequestConfig,
): Promise<APIResponseDictItemDto[]> {
  const url = `/api/dictItem`
  return uccAxios.get(url, { ...config })
}

/** 根据 id 获取 DictItem 详情 */
export async function DictItemControllerFindById(
  params: { id: string },
  config?: RequestConfig,
): Promise<APIResponseDictItemDto> {
  const url = `/api/dictItem/${params.id}`
  return uccAxios.get(url, { ...config })
}

/** 修改 dictItem */
export async function DictItemControllerUpdate(
  params: { id: string },
  data: APIUpdateDictItemDto,
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictItem/${params.id}`
  return await uccAxios.patch(url, data, { ...config })
}

/** 根据 ID 删除 dictItem */
export async function DictItemControllerDelete(
  params: { id: string },
  config?: RequestConfig,
): Promise<boolean> {
  const url = `/api/dictItem/${params.id}`
  return uccAxios.delete(url, { ...config })
}

/** 分页查询 dictItem */
export async function DictItemControllerPageList(
  data: APIQueryDto,
  config?: RequestConfig,
): Promise<IPageListData<APIResponseDictItemDto>> {
  const url = `/api/dictItem/pageList`
  return await uccAxios.post(url, data, { ...config })
}
