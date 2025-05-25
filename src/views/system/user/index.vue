<template>
  <div>
    <haozi-table
      :table-search="tableSearch"
      :table-column="tableColumn"
      :get-data-fn="getDataFn"
      v-model:table-data="tableData"
    >
    </haozi-table>
  </div>
</template>

<script setup lang="tsx" name="user">
import { HaoziTable } from '@/components/advancedComponents/index'
import { ref } from 'vue'

const tableSearch = ref<ITableSearch[]>([
  {
    field: 'username',
    title: '用户名',
    type: 'text',
  },
  {
    field: 'password',
    title: '密码',
    type: 'text',
  },
  {
    field: 'name',
    title: '姓名',
    type: 'text',
  },
  {
    field: 'avatar',
    title: '头像',
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
    type: 'text',
  },
  {
    field: 'lastLoginAt',
    title: '最后登录时间',
    type: 'text',
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    type: 'text',
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    type: 'text',
  },
  {
    field: 'joinTime',
    title: '入职时间',
    type: 'text',
  },
  {
    field: 'leaveTime',
    title: '离职时间',
    type: 'text',
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
    type: 'text',
  },
  {
    field: 'createdBy',
    title: '创建人',
    type: 'text',
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    type: 'text',
  },
  {
    field: 'updatedBy',
    title: '更新人',
    type: 'text',
  },
  {
    field: 'deletedAt',
    title: '删除时间',
    type: 'text',
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
    width: 100,
  },
  {
    field: 'password',
    title: '密码',
    width: 100,
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
    width: 100,
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
    width: 100,
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    width: 100,
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    width: 100,
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
    width: 100,
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
const tableData = ref([
  {
    username: 'admin',
  },
])
async function getDataFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            username: 'admin',
          },
        ],
        total: 1,
      })
    }, 1000)
  })
}
</script>

<style scoped lang="scss"></style>
