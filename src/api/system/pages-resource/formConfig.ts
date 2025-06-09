// Auto-generated from swagger

const ResponseDepartmentDtoFormConfig = [
  {
    prop: 'id',
    label: '主键 ID',
    type: 'text',
    rules: [{ required: true, message: '主键 ID不能为空' }],
  },
  {
    prop: 'name',
    label: '部门名称',
    type: 'text',
    rules: [{ required: true, message: '部门名称不能为空' }],
  },
  {
    prop: 'code',
    label: '部门编码',
    type: 'text',
  },
  {
    prop: 'parentId',
    label: '上级部门 ID（用于树结构）',
    type: 'text',
  },
  {
    prop: 'parent',
    label: '',
    type: 'text',
  },
  {
    prop: 'leader',
    label: '部门负责人名称',
    type: 'text',
  },
  {
    prop: 'leaderId',
    label: '部门负责人用户 ID（可选）',
    type: 'text',
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'number',
    rules: [{ required: true, message: '排序不能为空' }],
  },
  {
    prop: 'isEnable',
    label: '是否启用',
    type: 'text',
    rules: [{ required: true, message: '是否启用不能为空' }],
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    type: 'text',
    rules: [{ required: true, message: '创建时间不能为空' }],
  },
  {
    prop: 'createdBy',
    label: '创建人',
    type: 'text',
    rules: [{ required: true, message: '创建人不能为空' }],
  },
  {
    prop: 'createdId',
    label: '创建人ID',
    type: 'text',
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    type: 'text',
    rules: [{ required: true, message: '更新时间不能为空' }],
  },
  {
    prop: 'updatedBy',
    label: '更新人',
    type: 'text',
  },
  {
    prop: 'updatedId',
    label: '更新人ID',
    type: 'text',
  },
  {
    prop: 'deletedAt',
    label: '删除时间',
    type: 'text',
  },
  {
    prop: 'deletedBy',
    label: '删除人',
    type: 'text',
  },
  {
    prop: 'deletedId',
    label: '删除人ID',
    type: 'text',
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'text',
  },
]

const ResponseUserDtoFormConfig = [
  {
    prop: 'id',
    label: 'id',
    type: 'text',
    rules: [{ required: true, message: 'id不能为空' }],
  },
  {
    prop: 'username',
    label: '用户名',
    type: 'text',
    rules: [{ required: true, message: '用户名不能为空' }],
  },
  {
    prop: 'password',
    label: '密码',
    type: 'text',
    rules: [{ required: true, message: '密码不能为空' }],
  },
  {
    prop: 'name',
    label: '姓名',
    type: 'text',
    rules: [{ required: true, message: '姓名不能为空' }],
  },
  {
    prop: 'avatar',
    label: '头像',
    type: 'text',
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'text',
    rules: [{ required: true, message: '邮箱不能为空' }],
  },
  {
    prop: 'mobile',
    label: '手机号',
    type: 'text',
    rules: [{ required: true, message: '手机号不能为空' }],
  },
  {
    prop: 'sex',
    label: '性别',
    type: 'text',
    rules: [{ required: true, message: '性别不能为空' }],
  },
  {
    prop: 'address',
    label: '住址',
    type: 'text',
    rules: [{ required: true, message: '住址不能为空' }],
  },
  {
    prop: 'nativeAddress',
    label: '籍贯',
    type: 'text',
    rules: [{ required: true, message: '籍贯不能为空' }],
  },
  {
    prop: 'idCard',
    label: '身份证号码',
    type: 'text',
    rules: [{ required: true, message: '身份证号码不能为空' }],
  },
  {
    prop: 'isEnable',
    label: '是否启用',
    type: 'text',
    rules: [{ required: true, message: '是否启用不能为空' }],
  },
  {
    prop: 'lastLoginAt',
    label: '最后登录时间',
    type: 'text',
  },
  {
    prop: 'loginFailCount',
    label: '登录失败次数',
    type: 'number',
  },
  {
    prop: 'loginLockedUnitl',
    label: '登录锁定时间',
    type: 'text',
  },
  {
    prop: 'joinTime',
    label: '入职时间',
    type: 'text',
    rules: [{ required: true, message: '入职时间不能为空' }],
  },
  {
    prop: 'leaveTime',
    label: '离职时间',
    type: 'text',
  },
  {
    prop: 'department',
    label: '关联部门详情',
    type: 'text',
  },
  {
    prop: 'departmentId',
    label: '部门ID',
    type: 'text',
  },
  {
    prop: 'position',
    label: '职位',
    type: 'text',
    rules: [{ required: true, message: '职位不能为空' }],
  },
  {
    prop: 'positionId',
    label: '职位ID',
    type: 'text',
  },
  {
    prop: 'education',
    label: '学历',
    type: 'text',
    rules: [{ required: true, message: '学历不能为空' }],
  },
  {
    prop: 'graduateSchool',
    label: '毕业院校',
    type: 'text',
    rules: [{ required: true, message: '毕业院校不能为空' }],
  },
  {
    prop: 'emergencyContacts',
    label: '紧急联系人',
    type: 'text',
    rules: [{ required: true, message: '紧急联系人不能为空' }],
  },
  {
    prop: 'emergencyContactPhone',
    label: '紧急联系人电话',
    type: 'text',
    rules: [{ required: true, message: '紧急联系人电话不能为空' }],
  },
  {
    prop: 'idPhoto',
    label: '身份证照片',
    type: 'text',
  },
  {
    prop: 'bankCard',
    label: '银行卡账号',
    type: 'text',
  },
  {
    prop: 'bankCardPhoto',
    label: '银行卡照片',
    type: 'text',
  },
  {
    prop: 'resume',
    label: '简历',
    type: 'text',
  },
  {
    prop: 'politicalStatus',
    label: '政治面貌',
    type: 'text',
    rules: [{ required: true, message: '政治面貌不能为空' }],
  },
  {
    prop: 'status',
    label: '在职状态',
    type: 'text',
  },
  {
    prop: 'birthday',
    label: '生日',
    type: 'text',
    rules: [{ required: true, message: '生日不能为空' }],
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    type: 'text',
    rules: [{ required: true, message: '创建时间不能为空' }],
  },
  {
    prop: 'createdBy',
    label: '创建人',
    type: 'text',
    rules: [{ required: true, message: '创建人不能为空' }],
  },
  {
    prop: 'createdId',
    label: '创建人ID',
    type: 'text',
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    type: 'text',
    rules: [{ required: true, message: '更新时间不能为空' }],
  },
  {
    prop: 'updatedBy',
    label: '更新人',
    type: 'text',
  },
  {
    prop: 'updatedId',
    label: '更新人ID',
    type: 'text',
  },
  {
    prop: 'deletedAt',
    label: '删除时间',
    type: 'text',
  },
  {
    prop: 'deletedBy',
    label: '删除人',
    type: 'text',
  },
  {
    prop: 'deletedId',
    label: '删除人ID',
    type: 'text',
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'text',
  },
]
