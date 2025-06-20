// Auto-generated from swagger

interface APICommonResponse {
  code: number;
  message: string;
  data: Record<string, any>;
}

interface APISimpleDepartmentDto {
  name: string;
}

interface APIResponseUserDto {
  /** id */
  id: string;
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
  /** 住址 */
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
  /** 关联部门详情 */
  department?: any;
  /** 部门ID */
  departmentId?: string;
  /** 职位 */
  position: string;
  /** 职位ID */
  positionId?: string;
  /** 学历 */
  education: string;
  /** 毕业院校 */
  graduateSchool: string;
  /** 紧急联系人 */
  emergencyContacts: string;
  /** 紧急联系人电话 */
  emergencyContactPhone: string;
  /** 身份证照片 */
  idPhoto?: string;
  /** 银行卡账号 */
  bankCard?: string;
  /** 银行卡照片 */
  bankCardPhoto?: string;
  /** 简历 */
  resume?: string;
  /** 政治面貌 */
  politicalStatus: string;
  /** 在职状态 */
  status?: string;
  /** 生日 */
  birthday: string;
  /** 创建时间 */
  createdAt: string;
  /** 创建人 */
  createdBy: string;
  /** 创建人ID */
  createdId?: string;
  /** 更新时间 */
  updatedAt: string;
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

interface APIResponseLoginDto {
  /** accessToken */
  accessToken: string;
  /** 用户信息 */
  user: any;
}

interface APILoginDto {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
}
