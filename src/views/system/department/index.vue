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
        <el-button @click="handleCru('新增部门')" type="primary">新增</el-button>
      </template>
      <template #action="{ row }">
        <div style="display: flex; gap: 0 15px">
          <el-link :underline="false" type="warning" @click="handleCru('修改部门', row, true)"
            >修改</el-link
          >
          <el-link :underline="false" type="danger" @click="handleDelete(row)">删除</el-link>
          <el-link ::underline="false" type="primary" @click="handleCru('部门详情', row, false)"
            >详情</el-link
          >
        </div>
      </template>
    </haozi-table>
    <cru-drawer ref="cruDrawerRef" @refresh="tableRef?.onRefresh?.()"></cru-drawer>
  </div>
</template>

<script setup lang="tsx" name="user">
import { DepartmentControllerDelete, DepartmentControllerPageList } from '@/api/system/api'
import { HaoziTable } from '@/components/advancedComponents/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import CruDrawer from './cru-drawer.vue'

const tableRef = useTemplateRef('tableRef')
const tableSearch = ref<ITableSearch[]>([
  {
    field: 'name',
    title: '部门名称',
    type: 'text',
  },
  {
    field: 'parentId',
    title: '上级部门',
    type: 'text',
  },
  {
    field: 'leader',
    title: '部门负责人',
    type: 'text',
  },
  {
    field: 'isEnable',
    title: '是否启用',
    type: 'radio',
    options: [
      {
        label: '启用',
        value: true,
      },
      {
        label: '禁用',
        value: false,
      },
    ],
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
    field: 'name',
    title: '部门名称',
    width: 150,
  },
  {
    field: 'parent.name',
    title: '上级部门',
    width: 100,
  },
  {
    field: 'leader',
    title: '部门负责人',
    width: 100,
  },
  {
    field: 'sort',
    title: '排序',
    width: 100,
  },
  {
    field: 'isEnable',
    title: '是否启用',
    width: 100,
  },
  {
    field: 'createdAt',
    title: '创建时间',
    width: 170,
  },
  {
    field: 'createdBy',
    title: '创建人',
    width: 100,
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    width: 170,
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
  const res = await DepartmentControllerPageList(conditions)
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
  ElMessageBox.confirm(`您确定要删除部门【${row.name}】吗?`, '提醒', {
    type: 'warning',
  })
    .then(async () => {
      const res = await DepartmentControllerDelete({ id: row.id })
      if (res) {
        ElMessage.success('删除成功')
        tableRef.value?.onRefresh?.()
      }
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>
