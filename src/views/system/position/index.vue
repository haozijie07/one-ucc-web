<template>
  <div>
    <HaoziTable
      ref="tableRef"
      :table-column="tableColumn"
      :table-search="tableSearch"
      :get-data-fn="getDataFn"
    >
      <template #table-header-left>
        <el-button @click="handleCru('新增职位')" type="primary">新增</el-button>
      </template>
      <template #action="{ row }">
        <div style="display: flex; gap: 0 15px">
          <el-link :underline="false" type="warning" @click="handleCru('修改职位', row, true)"
            >修改</el-link
          >
          <el-link :underline="false" type="danger" @click="handleDelete">删除</el-link>
          <el-link :underline="false" type="primary" @click="handleCru('职位详情', row, false)"
            >详情</el-link
          >
        </div>
      </template>
    </HaoziTable>
    <cru-drawer ref="cruDrawerRef" @refresh="tableRef?.onRefresh?.()"></cru-drawer>
  </div>
</template>

<script setup lang="tsx" name="position">
import { PositionControllerDelete, PositionControllerPageList } from '@/api/system/api'
import { HaoziTable } from '@/components/advancedComponents'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, useTemplateRef } from 'vue'

import CruDrawer from './cru-drawer.vue'

const tableRef = useTemplateRef('tableRef')
const tableSearch = ref<ITableSearch[]>([
  {
    field: 'name',
    title: '职位名称',
    type: 'text',
  },
  {
    field: 'description',
    title: '职位描述',
    type: 'text',
  },
  {
    field: 'category',
    title: '职位类别',
    type: 'text',
  },
  {
    field: 'jobType',
    title: '职位性质',
    type: 'text',
  },
  {
    field: 'departmentIds',
    title: '关联部门',
    type: 'multiselect',
    optionsType: 'department',
  },
  {
    field: 'sort',
    title: '排序',
    type: 'number',
  },
  {
    field: 'isEnable',
    title: '是否启用',
    type: 'text',
  },
  {
    field: 'createdAt',
    title: '创建时间',
    type: 'datetimerange',
  },
  {
    field: 'createdId',
    title: '创建人',
    type: 'select',
    optionsType: 'user',
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    type: 'datetimerange',
  },
  {
    field: 'updatedId',
    title: '更新人',
    type: 'select',
    optionsType: 'user',
  },
])

const tableColumn = ref<ITableColumn[]>([
  {
    field: 'name',
    title: '职位名称',
    width: 200,
  },
  {
    field: 'code',
    title: '职位编码',
    width: 100,
  },
  {
    field: 'description',
    title: '职位描述',
    width: 100,
  },
  {
    field: 'category',
    title: '职位类别',
    width: 100,
  },
  {
    field: 'jobType',
    title: '职位性质',
    width: 100,
  },
  {
    field: 'departments.name',
    title: '关联部门',
    width: 100,
    type: 'custom',
    render({ row }: { row: APIResponsePositionDto }) {
      return <div>{row.departments.map((item: APISimpleDepartmentDto) => item.name).join(',')}</div>
    },
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
    width: 170,
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

async function getDataFn(conditions: any) {
  const res = await PositionControllerPageList(conditions)
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
  ElMessageBox.confirm(`您确定要删除职位【${row.name}】吗?`, '提醒', {
    type: 'warning',
  })
    .then(async () => {
      const res = await PositionControllerDelete({ id: row.id })
      if (res) {
        ElMessage.success('删除成功')
        tableRef.value?.onRefresh?.()
      }
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>
