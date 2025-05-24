// Auto-generated from swagger

export interface APICommonResponse {
  code: number;
  message: string;
  data: Record<string, any>;
}

export interface APIUpdateUserDto {
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
  /** 职位 */
  position?: string;
  /** 部门 */
  department?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  remark?: string;
}

export interface APICreateUserDto {
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
  loginFailCount: number;
  /** 登录锁定时间 */
  loginLockedUnitl?: string;
  /** 入职时间 */
  joinTime: string;
  /** 离职时间 */
  leaveTime?: string;
  /** 职位 */
  position: string;
  /** 部门 */
  department: string;
  createdAt?: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  remark?: string;
}

export interface APICondition {
  /** 字段名 */
  field: string;
  /** 操作符 */
  operator: 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'like' | 'in' | 'between';
  /** 值 */
  value?: Record<string, any>;
}

export interface APIQueryDto {
  /** 当前页码 */
  pageIndex: number;
  /** 每页条数 */
  pageSize: number;
  /** 过滤条件 */
  conditions?: Types.APICondition[];
  /** 排序字段 */
  sortBy: string;
  /** 排序顺序 */
  sortOrder?: 'asc' | 'desc';
}
