// Auto-generated from swagger

interface APICommonResponse {
  code: number;
  message: string;
  data: Record<string, any>;
}

interface APIUpdateDepartmentDto {
  /** 主键 ID */
  id: string;
  /** 部门名称 */
  name?: string;
  /** 部门编码 */
  code?: string;
  /** 上级部门 ID（用于树结构） */
  parentId?: string;
  parent?: Record<string, any>;
  /** 部门负责人名称 */
  leader?: string;
  /** 部门负责人用户 ID（可选） */
  leaderId?: string;
  /** 排序 */
  sort?: number;
  /** 是否启用 */
  isEnable?: boolean;
  /** 创建时间 */
  createdAt?: string;
  /** 创建人 */
  createdBy?: string;
  /** 创建人ID */
  createdId?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 更新人 */
  updatedBy?: string;
  /** 更新人ID */
  updatedId?: string;
  /** 删除时间 */
  deletedAt?: string;
  /** 删除人 */
  deletedBy?: string;
  /** 删除人ID */
  deletedId?: string;
  /** 备注 */
  remark?: string;
}

interface APICreateDepartmentDto {
  /** 部门名称 */
  name: string;
  /** 部门编码 */
  code?: string;
  /** 上级部门 ID（用于树结构） */
  parentId?: string;
  parent?: Record<string, any>;
  /** 部门负责人名称 */
  leader?: string;
  /** 部门负责人用户 ID（可选） */
  leaderId?: string;
  /** 排序 */
  sort: number;
  /** 是否启用 */
  isEnable: boolean;
  /** 创建时间 */
  createdAt?: string;
  /** 创建人 */
  createdBy: string;
  /** 创建人ID */
  createdId?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 更新人 */
  updatedBy?: string;
  /** 更新人ID */
  updatedId?: string;
  /** 删除时间 */
  deletedAt?: string;
  /** 删除人 */
  deletedBy?: string;
  /** 删除人ID */
  deletedId?: string;
  /** 备注 */
  remark?: string;
}

interface APICondition {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator: 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'like' | 'in' | 'between';
  /** 值 */
  value?: Record<string, any>;
}

interface APIQueryDto {
  /** 当前页码 */
  pageIndex: number;
  /** 每页条数 */
  pageSize: number;
  /** 过滤条件 */
  conditions?: APICondition[];
  /** 排序字段 */
  sortBy: string;
  /** 排序顺序 */
  sortOrder?: 'asc' | 'desc';
}

interface APIUpdateUserDto {
  /** id */
  id: string;
  /** 用户名 */
  username?: string;
  /** 密码 */
  password?: string;
  /** 姓名 */
  name?: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 性别 */
  sex?: string;
  /** 地址 */
  address?: string;
  /** 籍贯 */
  nativeAddress?: string;
  /** 身份证号码 */
  idCard?: string;
  /** 是否启用 */
  isEnable?: boolean;
  /** 最后登录时间 */
  lastLoginAt?: string;
  /** 登录失败次数 */
  loginFailCount?: number;
  /** 登录锁定时间 */
  loginLockedUnitl?: string;
  /** 入职时间 */
  joinTime?: string;
  /** 离职时间 */
  leaveTime?: string;
  /** 部门 */
  department?: Record<string, any>;
  /** 部门ID */
  departmentId?: string;
  /** 职位 */
  position?: string;
  /** 职位ID */
  positionId?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 创建人 */
  createdBy?: string;
  /** 创建人ID */
  createdId?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 更新人 */
  updatedBy?: string;
  /** 更新人ID */
  updatedId?: string;
  /** 删除时间 */
  deletedAt?: string;
  /** 删除人 */
  deletedBy?: string;
  /** 删除人ID */
  deletedId?: string;
  /** 备注 */
  remark?: string;
}

interface APICreateUserDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 姓名 */
  name: string;
  /** 头像 */
  avatar?: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  mobile: string;
  /** 性别 */
  sex: string;
  /** 地址 */
  address: string;
  /** 籍贯 */
  nativeAddress: string;
  /** 身份证号码 */
  idCard: string;
  /** 是否启用 */
  isEnable: boolean;
  /** 最后登录时间 */
  lastLoginAt?: string;
  /** 登录失败次数 */
  loginFailCount?: number;
  /** 登录锁定时间 */
  loginLockedUnitl?: string;
  /** 入职时间 */
  joinTime: string;
  /** 离职时间 */
  leaveTime?: string;
  /** 部门 */
  department: Record<string, any>;
  /** 部门ID */
  departmentId?: string;
  /** 职位 */
  position: string;
  /** 职位ID */
  positionId?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 创建人 */
  createdBy: string;
  /** 创建人ID */
  createdId?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 更新人 */
  updatedBy?: string;
  /** 更新人ID */
  updatedId?: string;
  /** 删除时间 */
  deletedAt?: string;
  /** 删除人 */
  deletedBy?: string;
  /** 删除人ID */
  deletedId?: string;
  /** 备注 */
  remark?: string;
}
