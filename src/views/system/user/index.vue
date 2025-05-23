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
    title: '用户名',
    field: 'username',
    type: 'text',
  },
])
const tableColumn = ref<ITableColumn[]>([
  {
    title: 'id',
    field: 'id',
  },
  {
    title: '用户名',
    field: 'username',
  },
  {
    title: '姓名',
    field: 'name',
  },
  {
    title: '头像',
    field: 'avatar',
  },
  {
    title: '邮箱',
    field: 'email',
  },
  {
    title: '手机号',
    field: 'mobile',
  },
  {
    title: '性别',
    field: 'sex',
  },
  {
    title: '地址',
    field: 'address',
  },
  {
    title: '籍贯',
    field: 'nativeAddress',
  },
  {
    title: '身份证',
    field: 'idCard',
  },
  {
    title: '是否启用',
    field: 'isEnable',
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
