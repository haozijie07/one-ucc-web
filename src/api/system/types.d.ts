// Auto-generated from swagger

interface APICommonResponse {
  code: number
  message: string
  data: Record<string, any>
}

interface APISimpleParentDto {
  name: string
}

interface APISimpleLeaderDto {
  name: string
}

interface APIResponseDepartmentDto {
  /** 主键 ID */
  id: string
  /** 部门名称 */
  name: string
  /** 部门编码 */
  code?: string
  /** 上级部门 ID（用于树结构） */
  parentId?: string
  /** 上级部门 */
  parent?: any
  /** 部门负责人名称 */
  leader?: any
  /** 部门负责人用户 ID（可选） */
  leaderId?: string
  /** 排序 */
  sort: number
  /** 是否启用 */
  isEnable: boolean
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 创建人ID */
  createdId?: string
  /** 更新时间 */
  updatedAt: string
  /** 更新人 */
  updatedBy?: string
  /** 更新人ID */
  updatedId?: string
  /** 删除时间 */
  deletedAt?: string
  /** 删除人 */
  deletedBy?: string
  /** 删除人ID */
  deletedId?: string
  /** 备注 */
  remark?: string
}

interface APICreateDepartmentDto {
  /** 部门名称 */
  name: string
  /** 部门编码 */
  code?: string
  /** 上级部门 ID（用于树结构） */
  parentId?: string
  /** 部门负责人用户 ID（可选） */
  leaderId?: string
  /** 排序 */
  sort: number
  /** 是否启用 */
  isEnable: boolean
  /** 备注 */
  remark?: string
}

interface APIUpdateDepartmentDto {
  /** 部门名称 */
  name?: string
  /** 部门编码 */
  code?: string
  /** 上级部门 ID（用于树结构） */
  parentId?: string
  /** 部门负责人用户 ID（可选） */
  leaderId?: string
  /** 排序 */
  sort?: number
  /** 是否启用 */
  isEnable?: boolean
  /** 备注 */
  remark?: string
}

interface APICondition {
  /** 字段名 */
  field: string
  /** 操作符 */
  operator: 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'like' | 'in' | 'between'
  /** 值 */
  value?: Record<string, any>
}

interface APIQueryDto {
  /** 当前页码 */
  pageIndex: number
  /** 每页条数 */
  pageSize: number
  /** 过滤条件 */
  conditions?: APICondition[]
  /** 排序字段 */
  sortBy: string
  /** 排序顺序 */
  sortOrder?: 'asc' | 'desc'
}

interface APISimpleDepartmentDto {
  /** 部门id */
  id: string
  /** 部门名称 */
  name: string
}

interface APIResponsePositionDto {
  /** 职位ID */
  id: string
  /** 职位名称 */
  name: string
  /** 职位编码（可选） */
  code?: string
  /** 职位描述（可选） */
  description?: string
  /** 职位类别：技术岗、行政岗等 */
  category?: string
  /** 职位性质：全职、兼职、实习等 */
  jobType?: string
  /** 关联部门详情 */
  department?: APISimpleDepartmentDto
  /** 排序 */
  sort: number
  /** 是否启用 */
  isEnable: boolean
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 创建人ID */
  createdId?: string
  /** 更新时间 */
  updatedAt: string
  /** 更新人 */
  updatedBy?: string
  /** 更新人ID */
  updatedId?: string
  /** 删除时间 */
  deletedAt?: string
  /** 删除人 */
  deletedBy?: string
  /** 删除人ID */
  deletedId?: string
  /** 备注 */
  remark?: string
}

interface APICreatePositionDto {
  /** 职位名称 */
  name: string
  /** 职位编码（可选） */
  code?: string
  /** 职位描述（可选） */
  description?: string
  /** 职位类别：技术岗、行政岗等 */
  category?: string
  /** 职位性质：全职、兼职、实习等 */
  jobType?: string
  /** 所属部门数组 */
  departmentIds?: string[]
  /** 排序 */
  sort: number
  /** 是否启用 */
  isEnable: boolean
  /** 备注 */
  remark?: string
}

interface APIUpdatePositionDto {
  /** 职位名称 */
  name?: string
  /** 职位编码（可选） */
  code?: string
  /** 职位描述（可选） */
  description?: string
  /** 职位类别：技术岗、行政岗等 */
  category?: string
  /** 职位性质：全职、兼职、实习等 */
  jobType?: string
  /** 所属部门数组 */
  departmentIds?: string[]
  /** 排序 */
  sort?: number
  /** 是否启用 */
  isEnable?: boolean
  /** 备注 */
  remark?: string
}

interface APISimplePositionDto {
  name: string
}

interface APIResponseUserDto {
  /** id */
  id: string
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 姓名 */
  name: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email: string
  /** 手机号 */
  mobile: string
  /** 性别 */
  sex: string
  /** 住址 */
  address: string
  /** 籍贯 */
  nativeAddress: string
  /** 身份证号码 */
  idCard: string
  /** 是否启用 */
  isEnable: boolean
  /** 最后登录时间 */
  lastLoginAt?: string
  /** 登录失败次数 */
  loginFailCount?: number
  /** 登录锁定时间 */
  loginLockedUnitl?: string
  /** 入职时间 */
  joinTime: string
  /** 离职时间 */
  leaveTime?: string
  /** 关联部门详情 */
  department?: any
  /** 部门ID */
  departmentId?: string
  /** 职位 */
  position: any
  /** 职位ID */
  positionId?: string
  /** 学历 */
  education: string
  /** 毕业院校 */
  graduateSchool: string
  /** 紧急联系人 */
  emergencyContacts: string
  /** 紧急联系人电话 */
  emergencyContactPhone: string
  /** 身份证照片 */
  idPhoto?: string
  /** 银行卡账号 */
  bankCard?: string
  /** 银行卡照片 */
  bankCardPhoto?: string
  /** 简历 */
  resume?: string
  /** 政治面貌 */
  politicalStatus: string
  /** 在职状态 */
  status?: string
  /** 生日 */
  birthday: string
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 创建人ID */
  createdId?: string
  /** 更新时间 */
  updatedAt: string
  /** 更新人 */
  updatedBy?: string
  /** 更新人ID */
  updatedId?: string
  /** 删除时间 */
  deletedAt?: string
  /** 删除人 */
  deletedBy?: string
  /** 删除人ID */
  deletedId?: string
  /** 备注 */
  remark?: string
}

interface APICreateUserDto {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 姓名 */
  name: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email: string
  /** 手机号 */
  mobile: string
  /** 性别 */
  sex: string
  /** 住址 */
  address: string
  /** 籍贯 */
  nativeAddress: string
  /** 身份证号码 */
  idCard: string
  /** 是否启用 */
  isEnable: boolean
  /** 最后登录时间 */
  lastLoginAt?: string
  /** 登录失败次数 */
  loginFailCount?: number
  /** 登录锁定时间 */
  loginLockedUnitl?: string
  /** 入职时间 */
  joinTime: string
  /** 离职时间 */
  leaveTime?: string
  /** 部门ID */
  departmentId?: string
  /** 职位ID */
  positionId?: string
  /** 学历 */
  education: string
  /** 毕业院校 */
  graduateSchool: string
  /** 紧急联系人 */
  emergencyContacts: string
  /** 紧急联系人电话 */
  emergencyContactPhone: string
  /** 身份证照片 */
  idPhoto?: string
  /** 银行卡账号 */
  bankCard?: string
  /** 银行卡照片 */
  bankCardPhoto?: string
  /** 简历 */
  resume?: string
  /** 政治面貌 */
  politicalStatus: string
  /** 在职状态 */
  status?: string
  /** 生日 */
  birthday: string
  /** 薪资 */
  salary?: number
  /** 备注 */
  remark?: string
}

interface APIUpdateUserDto {
  /** 用户名 */
  username?: string
  /** 密码 */
  password?: string
  /** 姓名 */
  name?: string
  /** 头像 */
  avatar?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  mobile?: string
  /** 性别 */
  sex?: string
  /** 住址 */
  address?: string
  /** 籍贯 */
  nativeAddress?: string
  /** 身份证号码 */
  idCard?: string
  /** 是否启用 */
  isEnable?: boolean
  /** 最后登录时间 */
  lastLoginAt?: string
  /** 登录失败次数 */
  loginFailCount?: number
  /** 登录锁定时间 */
  loginLockedUnitl?: string
  /** 入职时间 */
  joinTime?: string
  /** 离职时间 */
  leaveTime?: string
  /** 部门ID */
  departmentId?: string
  /** 职位ID */
  positionId?: string
  /** 学历 */
  education?: string
  /** 毕业院校 */
  graduateSchool?: string
  /** 紧急联系人 */
  emergencyContacts?: string
  /** 紧急联系人电话 */
  emergencyContactPhone?: string
  /** 身份证照片 */
  idPhoto?: string
  /** 银行卡账号 */
  bankCard?: string
  /** 银行卡照片 */
  bankCardPhoto?: string
  /** 简历 */
  resume?: string
  /** 政治面貌 */
  politicalStatus?: string
  /** 在职状态 */
  status?: string
  /** 生日 */
  birthday?: string
  /** 薪资 */
  salary?: number
  /** 备注 */
  remark?: string
}

interface APIResponseDictTypeDto {
  /** id */
  id: string
  /** 编码，如 sex、status */
  code: string
  /** 名称 */
  name: string
  /** 说明 */
  description?: string
  /** 是否启用 */
  isEnable: boolean
  /** 排序 */
  sort: number
  /** 创建时间 */
  createdAt: string
  /** 创建人 */
  createdBy: string
  /** 创建人ID */
  createdId?: string
  /** 更新时间 */
  updatedAt: string
  /** 更新人 */
  updatedBy?: string
  /** 更新人ID */
  updatedId?: string
  /** 删除时间 */
  deletedAt?: string
  /** 删除人 */
  deletedBy?: string
  /** 删除人ID */
  deletedId?: string
  /** 备注 */
  remark?: string
}

interface APICreateDictTypeDto {
  /** 编码，如 sex、status */
  code: string
  /** 名称 */
  name: string
  /** 说明 */
  description?: string
  /** 是否启用 */
  isEnable: boolean
  /** 排序 */
  sort: number
  /** 备注 */
  remark?: string
}

interface APIUpdateDictTypeDto {
  /** 编码，如 sex、status */
  code?: string
  /** 名称 */
  name?: string
  /** 说明 */
  description?: string
  /** 是否启用 */
  isEnable?: boolean
  /** 排序 */
  sort?: number
  /** 备注 */
  remark?: string
}
