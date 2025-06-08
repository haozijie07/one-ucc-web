<template>
  <div>
    <haozi-table
      ref="tableRef"
      :table-search="tableSearch"
      :table-column="tableColumn"
      :get-data-fn="getDataFn"
      v-model:table-data="tableData"
    >
      <template #table-header-left>
        <el-button @click="handleCru('新增用户')" type="primary">新增</el-button>
      </template>
      <template #action="{ row }">
        <div style="display: flex; gap: 0 15px">
          <el-link :underline="false" type="warning" @click="handleCru('修改用户', row, true)"
            >修改</el-link
          >
          <el-link :underline="false" type="danger" @click="handleDelete(row)">删除</el-link>
          <el-link ::underline="false" type="primary" @click="handleCru('用户详情', row, false)"
            >详情</el-link
          >
        </div>
      </template>
    </haozi-table>
    <cru-drawer ref="cruDrawerRef" @refresh="tableRef?.onRefresh?.()"></cru-drawer>
  </div>
</template>

<script setup lang="tsx" name="user">
import { UserControllerDelete, UserControllerPageList } from '@/api/system/api'
import { HaoziTable } from '@/components/advancedComponents/index'
import { dayjs, ElMessage, ElMessageBox } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import CruDrawer from './cru-drawer.vue'

const tableRef = useTemplateRef('tableRef')
const tableSearch = ref<ITableSearch[]>([
  {
    field: 'username',
    title: '用户名',
    type: 'text',
  },
  {
    field: 'name',
    title: '姓名',
    type: 'text',
  },
  {
    field: 'email',
    title: '邮箱',
    type: 'text',
  },
  {
    field: 'mobile',
    title: '手机号',
    type: 'text',
  },
  {
    field: 'sex',
    title: '性别',
    type: 'text',
  },
  {
    field: 'address',
    title: '地址',
    type: 'text',
  },
  {
    field: 'nativeAddress',
    title: '籍贯',
    type: 'text',
  },
  {
    field: 'idCard',
    title: '身份证号码',
    type: 'text',
  },
  {
    field: 'isEnable',
    title: '是否启用',
    type: 'radio',
    options: [
      {
        label: '是',
        value: true,
      },
      {
        label: '否',
        value: false,
      },
    ],
  },
  {
    field: 'lastLoginAt',
    title: '最后登录时间',
    type: 'datetimerange',
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    type: 'number',
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    type: 'datetimerange',
  },
  {
    field: 'joinTime',
    title: '入职时间',
    type: 'datetimerange',
  },
  {
    field: 'leaveTime',
    title: '离职时间',
    type: 'datetimerange',
  },
  {
    field: 'departmentId',
    title: '部门',
    type: 'select',
    optionsType: 'department',
  },
  {
    field: 'position',
    title: '职位',
    type: 'text',
  },
  {
    field: 'education',
    title: '学历',
    type: 'select',
    options: [
      { label: '初中', value: '初中' },
      { label: '高中', value: '高中' },
      { label: '大专', value: '大专' },
      { label: '本科', value: '本科' },
      { label: '硕士', value: '硕士' },
      { label: '博士', value: '博士' },
    ],
  },
  {
    field: 'graduateSchool',
    title: '毕业院校',
    type: 'text',
  },
  {
    field: 'emergencyContacts',
    title: '紧急联系人',
    type: 'text',
  },
  {
    field: 'emergencyContactPhone',
    title: '紧急联系人电话',
    type: 'text',
  },
  {
    field: 'bankCard',
    title: '银行卡账号',
    type: 'text',
  },
  {
    field: 'resume',
    title: '简历',
    type: 'text',
  },
  {
    field: 'politicalStatus',
    title: '政治面貌',
    type: 'radio',
    options: [
      {
        label: '党员',
        value: '党员',
      },
      {
        label: '团员',
        value: '团员',
      },
      {
        label: '群众',
        value: '群众',
      },
    ],
  },
  {
    field: 'status',
    title: '在职状态',
    type: 'select',
    options: [
      {
        label: '实习',
        value: '实习',
      },
      {
        label: '试用期',
        value: '试用期',
      },
      {
        label: '在职',
        value: '在职',
      },
      {
        label: '离职',
        value: '离职',
      },
    ],
  },
  {
    field: 'birthday',
    title: '生日',
    type: 'date',
  },
  {
    field: 'createdAt',
    title: '创建时间',
    type: 'datetimerange',
  },
  {
    field: 'createdBy',
    title: '创建人',
    type: 'text',
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    type: 'datetimerange',
  },
  {
    field: 'updatedBy',
    title: '更新人',
    type: 'text',
  },
  {
    field: 'deletedAt',
    title: '删除时间',
    type: 'datetimerange',
  },
  {
    field: 'deletedBy',
    title: '删除人',
    type: 'text',
  },
  {
    field: 'remark',
    title: '备注',
    type: 'text',
  },
])
const tableColumn = ref<ITableColumn[]>([
  {
    field: 'username',
    title: '用户名',
    width: 120,
  },
  {
    field: 'name',
    title: '姓名',
    width: 100,
  },
  {
    field: 'avatar',
    title: '头像',
    width: 100,
  },
  {
    field: 'email',
    title: '邮箱',
    width: 100,
  },
  {
    field: 'mobile',
    title: '手机号',
    width: 120,
  },
  {
    field: 'sex',
    title: '性别',
    width: 100,
  },
  {
    field: 'address',
    title: '地址',
    width: 100,
  },
  {
    field: 'nativeAddress',
    title: '籍贯',
    width: 100,
  },
  {
    field: 'idCard',
    title: '身份证号码',
    width: 100,
  },
  {
    field: 'isEnable',
    title: '是否启用',
    width: 100,
  },
  {
    field: 'lastLoginAt',
    title: '最后登录时间',
    width: 130,
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    width: 130,
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    width: 130,
  },
  {
    field: 'joinTime',
    title: '入职时间',
    width: 100,
  },
  {
    field: 'leaveTime',
    title: '离职时间',
    width: 100,
  },
  {
    field: 'position',
    title: '职位',
    width: 120,
  },
  {
    field: 'department.name',
    title: '部门',
    width: 100,
  },
  {
    field: 'education',
    title: '学历',
    width: 100,
  },
  {
    field: 'graduateSchool',
    title: '毕业院校',
    width: 100,
  },
  {
    field: 'emergencyContacts',
    title: '紧急联系人',
    width: 100,
  },
  {
    field: 'emergencyContactPhone',
    title: '紧急联系人电话',
    width: 100,
  },
  {
    field: 'idPhoto',
    title: '身份证照片',
    width: 100,
  },
  {
    field: 'bankCard',
    title: '银行卡账号',
    width: 100,
  },
  {
    field: 'bankCardPhoto',
    title: '银行卡照片',
    width: 100,
  },
  {
    field: 'resume',
    title: '简历',
    width: 100,
  },
  {
    field: 'politicalStatus',
    title: '政治面貌',
    width: 100,
  },
  {
    field: 'status',
    title: '在职状态',
    width: 100,
  },
  {
    field: 'birthday',
    title: '生日',
    width: 100,
    type: 'custom',
    render({ row }: { row: any }) {
      return <div>{dayjs(row.birthday).format('YYYY-MM-DD')}</div>
    },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    width: 100,
  },
  {
    field: 'createdBy',
    title: '创建人',
    width: 100,
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    width: 100,
  },
  {
    field: 'updatedBy',
    title: '更新人',
    width: 100,
  },
  {
    field: 'deletedAt',
    title: '删除时间',
    width: 100,
  },
  {
    field: 'deletedBy',
    title: '删除人',
    width: 100,
  },
  {
    field: 'remark',
    title: '备注',
    width: 100,
  },
])
const tableData = ref<APIUpdateUserDto[]>([])

async function getDataFn(conditions: any) {
  const res = await UserControllerPageList(conditions)
  if (res) {
    return res
  }
}

const cruDrawerRef = useTemplateRef('cruDrawerRef')
/* ----------------------------------- 添加 ----------------------------------- */
function handleCru(title: string, row?: any, isUpdate?: boolean) {
  cruDrawerRef.value?.openDrawer(title, row, isUpdate)
}

/* ----------------------------------- 删除 ----------------------------------- */
function handleDelete(row: any) {
  ElMessageBox.confirm(`您确定要删除用户【${row.name}】吗?`, '提醒', {
    type: 'warning',
  })
    .then(async () => {
      const res = await UserControllerDelete({ id: row.id })
      if (res) {
        ElMessage.success('删除成功')
        tableRef.value?.onRefresh?.()
      }
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>
