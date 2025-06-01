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
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </template>
      <template #action="{ row }">
        <div style="display: flex; gap: 0 15px">
          <el-link :underline="false" type="warning">修改</el-link>
          <el-link :underline="false" type="danger" @click="handleDelete(row)">删除</el-link>
          <el-link ::underline="false" type="primary">详情</el-link>
        </div>
      </template>
    </haozi-table>
    <cru-drawer ref="cruDrawerRef" @refresh="tableRef?.onRefresh?.()"></cru-drawer>
  </div>
</template>

<script setup lang="tsx" name="user">
import { UserControllerDelete, UserControllerPageList } from '@/api/api'
import { HaoziTable } from '@/components/advancedComponents/index'
import { ElMessage, ElMessageBox } from 'element-plus'
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
    field: 'position',
    title: '职位',
    type: 'text',
  },
  {
    field: 'department',
    title: '部门',
    type: 'text',
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
    field: 'department',
    title: '部门',
    width: 100,
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
function handleAdd() {
  cruDrawerRef.value?.openDrawer()
}

/* ----------------------------------- 删除 ----------------------------------- */
function handleDelete(row: any) {
  console.log('%c⧭', 'color: #7f7700', row)
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
