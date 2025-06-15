<template>
  <div>
    <haozi-table
      ref="tableRef"
      :table-search="tableSearch"
      :table-column="tableColumn"
      :table-config="{ expand: true }"
      :vxe-table-props="{ expandConfig: { height: 400 } }"
      :get-data-fn="getDataFn"
      v-model:table-data="tableData"
    >
      <template #expand>
        <haozi-table
          ref="tableRef"
          :table-search="dictItemTableSearch"
          :table-column="dictItemTableColumns"
          :table-config="{ showSearch: false, showPage: false, showHeader: false }"
          :vxe-table-props="{ stripe: false, border: false }"
          style="padding: 0"
          :get-data-fn="getDictItemFn"
        >
          <template #action="{ row }">
            <div style="display: flex; gap: 0 15px">
              <el-link
                :underline="false"
                type="warning"
                @click="handleAddItem('修改字典项', row, true)"
                >修改</el-link
              >
              <el-link :underline="false" type="danger" @click="handleDelete(row)">删除</el-link>
              <el-link
                :underline="false"
                type="primary"
                @click="handleAddItem('字典详情项', row, false)"
                >详情</el-link
              >
            </div>
          </template>
        </haozi-table>
      </template>

      <template #table-header-left>
        <el-button @click="handleCru('新增字典')" type="primary">新增</el-button>
      </template>
      <template #action="{ row }">
        <div style="display: flex; gap: 0 15px">
          <el-link :underline="false" type="success" @click="handleAddItem('新增字典项')"
            >新增子项</el-link
          >
          <el-link :underline="false" type="warning" @click="handleCru('修改字典', row, true)"
            >修改</el-link
          >
          <el-link :underline="false" type="danger" @click="handleDelete(row)">删除</el-link>
          <el-link :underline="false" type="primary" @click="handleCru('字典详情', row, false)"
            >详情</el-link
          >
        </div>
      </template>
    </haozi-table>

    <cru-drawer ref="cruDrawerRef" @refresh="tableRef?.onRefresh?.()"></cru-drawer>
    <dict-item-cru-drawer
      ref="dictItemCruDrawerRef"
      @refresh="tableRef?.onRefresh?.()"
    ></dict-item-cru-drawer>
  </div>
</template>

<script setup lang="tsx" name="dict">
import {
  DictItemControllerPageList,
  DictTypeControllerDelete,
  DictTypeControllerPageList,
} from '@/api/system/api'
import { HaoziTable } from '@/components/advancedComponents/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, useTemplateRef } from 'vue'
import CruDrawer from './cru-drawer.vue'
import DictItemCruDrawer from './dict-item-cru-drawer.vue'

const tableRef = useTemplateRef('tableRef')
const tableSearch = ref<ITableSearch[]>([
  {
    field: 'code',
    title: '编码',
    type: 'text',
  },
  {
    field: 'name',
    title: '名称',
    type: 'text',
  },
  {
    field: 'description',
    title: '说明',
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
    field: 'sort',
    title: '排序',
    type: 'number',
  },
  {
    field: 'createdAt',
    title: '创建时间',
    type: 'datetimerange',
  },
  {
    field: 'createdId',
    title: '创建人',
    type: 'multiselect',
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
    type: 'multiselect',
    optionsType: 'user',
  },
  {
    field: 'remark',
    title: '备注',
    type: 'text',
  },
])
const tableColumn = ref<ITableColumn[]>([
  {
    field: 'code',
    title: '编码',
    width: 100,
  },
  {
    field: 'name',
    title: '名称',
    width: 100,
  },
  {
    field: 'description',
    title: '说明',
    width: 100,
  },
  {
    field: 'isEnable',
    title: '是否启用',
    width: 100,
  },
  {
    field: 'sort',
    title: '排序',
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
    field: 'remark',
    title: '备注',
    width: 100,
  },
])
const tableData = ref<APIUpdateUserDto[]>([])

async function getDataFn(conditions: any) {
  const res = await DictTypeControllerPageList(conditions)
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
  ElMessageBox.confirm(`您确定要删除字典【${row.name}】吗?`, '提醒', {
    type: 'warning',
  })
    .then(async () => {
      const res = await DictTypeControllerDelete({ id: row.id })
      if (res) {
        ElMessage.success('删除成功')
        tableRef.value?.onRefresh?.()
      }
    })
    .catch(() => {})
}

const dictItemCruDrawerRef = useTemplateRef('dictItemCruDrawerRef')
/* ---------------------------------- 新增字典项 ---------------------------------- */
async function getDictItemFn(conditions: any) {
  const res = await DictItemControllerPageList(conditions)
  if (res) {
    return res
  }
}
const dictItemTableSearch = ref<ITableSearch[]>([
  {
    field: 'dictTypeId',
    title: '字典类型',
    type: 'text',
  },
  {
    field: 'value',
    title: '存储值',
    type: 'text',
  },
  {
    field: 'label',
    title: '显示名称',
    type: 'text',
  },
  {
    field: 'description',
    title: '描述',
    type: 'text',
  },
  {
    field: 'isEnable',
    title: '是否启用',
    type: 'text',
  },
  {
    field: 'isDefault',
    title: '是否默认',
    type: 'text',
  },
  {
    field: 'sort',
    title: '排序',
    type: 'number',
  },
  {
    field: 'color',
    title: '颜色样式',
    type: 'text',
  },
])
const dictItemTableColumns = ref<ITableColumn[]>([
  {
    field: 'dictTypeId',
    title: '字典类型',
    width: 300,
  },
  {
    field: 'value',
    title: '存储值',
    width: 100,
  },
  {
    field: 'label',
    title: '显示名称',
    width: 100,
  },
  {
    field: 'description',
    title: '描述',
    width: 100,
  },
  {
    field: 'isEnable',
    title: '是否启用',
    width: 100,
  },
  {
    field: 'isDefault',
    title: '是否默认',
    width: 100,
  },
  {
    field: 'sort',
    title: '排序',
    width: 100,
  },
  {
    field: 'color',
    title: '颜色样式',
    width: 100,
  },
])

function handleAddItem(title: string, row?: any, isUpdate?: boolean) {
  dictItemCruDrawerRef.value?.openDrawer(title, row, isUpdate)
}
</script>

<style scoped lang="scss"></style>
