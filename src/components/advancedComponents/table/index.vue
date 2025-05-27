<template>
  <div class="haozi-table">
    <el-card class="haozi-table-search-card" v-if="mergeTableConfig.showSearch && tableSearch">
      <SearchForm
        ref="searchFormRef"
        :table-search="tableSearch"
        v-model:searchFormData="searchFormData"
        @on-search="onSearch"
        @on-reset="onReset"
      />
    </el-card>
    <el-card class="haozi-table-card">
      <div class="haozi-table-header-container">
        <div>
          <slot name="table-header-left"></slot>
        </div>
        <slot name="table-header-right">
          <vxe-toolbar ref="toolbarRef" custom></vxe-toolbar>
        </slot>
      </div>
      <div class="haozi-table-container">
        <vxe-table
          ref="tableRef"
          border
          stripe
          :loading="loading"
          :data="tableData"
          :height="'100%'"
          v-bind="mergeVxeTableProps"
        >
          <vxe-column v-if="mergeTableConfig.showCheckbox" type="checkbox" width="40"></vxe-column>
          <vxe-column v-if="mergeTableConfig.showSeq" type="seq" width="70"></vxe-column>
          <template v-for="item in tableColumn" :key="item.field">
            <vxe-column
              :field="item.field"
              :title="item.title"
              :width="item.width"
              v-bind="item.columnProps"
            >
              <template #default="scope">
                <template v-if="item.type === 'image'">
                  <el-image style="height: 70px" :src="scope.row[item.field]" fit="contain" />
                </template>
                <template v-else-if="item.type === 'custom'">
                  <component :is="item.render?.(scope)" />
                </template>
                <template v-else>
                  {{ scope.row[item.field] }}
                </template>
              </template>
              <template v-if="item.isSummaryCol && item.footerRender" #footer="scope">
                <component :is="item.footerRender(scope, footerDataComputed)"></component>
              </template>
            </vxe-column>
          </template>
        </vxe-table>
      </div>
      <template #footer>
        <div class="haozi-table-footer">
          <el-pagination
            v-model:current-page="pageIndex"
            v-model:page-size="pageSize"
            :page-sizes="[20, 100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleIndexChange"
          />
        </div>
      </template>
    </el-card>
  </div>
</template>

<script lang="tsx" setup>
import { ref, onMounted, useTemplateRef, computed } from 'vue'
import SearchForm from './SearchForm/index.vue'
import type { VxeTablePropTypes, VxeTableProps, VxeToolbarInstance } from 'vxe-table'

const props = withDefaults(
  defineProps<{
    tableSearch?: ITableSearch[]
    tableColumn: ITableColumn[]
    tableConfig?: ITableConfig
    getDataFn: (data: ITableSearchFormData) => Promise<any>
    vxeTableProps?: VxeTableProps
  }>(),
  {},
)

const mergeTableConfig = computed(() => {
  return {
    showSearch: props.tableSearch,
    showSeq: true,
    showCheckbox: false,
    showPage: true,
    pageSize: [20, 100, 200, 300, 400],
    showFooter: false,
    ...props.tableConfig,
  }
})

const loading = ref(false)
const tableRef = useTemplateRef('tableRef')
const tableData = defineModel<any[]>('tableData', { default: [] })

/* ----------------------------------- 搜索 ----------------------------------- */
const searchFormRef = useTemplateRef('searchFormRef')
const searchFormData = ref<any>({})

/** 点击搜索 */
async function onSearch() {
  loading.value = true
  const conditions: Condition[] = []
  for (const index in props.tableSearch) {
    const search = props.tableSearch[+index]

    if (!!searchFormData.value[`${search.field}_value`]) {
      conditions.push({
        field: searchFormData.value[`${search.field}_field`],
        operator: searchFormData.value[`${search.field}_operator`],
        value: searchFormData.value[`${search.field}_value`],
        widget: search.type,
      })
    }
  }

  try {
    const result = await props.getDataFn({
      pageSize: pageSize.value,
      pageIndex: pageIndex.value,
      conditions,
    })
    tableData.value = result.data
    total.value = result.total
  } catch (error) {
    console.log('%c⧭', 'color: #731d1d', error)
  } finally {
    loading.value = false
  }
}

function mergeSearch() {
  if (mergeTableConfig.value.showSearch) {
    searchFormRef.value?.onSearch()
  } else {
    onSearch()
  }
}

/** 重置搜索 */
function onReset() {
  searchFormRef.value?.initSearchFormData()
  searchFormRef.value?.onSearch()
}

/* ----------------------------------- 表格 ----------------------------------- */
const mergeColumnConfig = computed<VxeTablePropTypes.ColumnConfig>(() => {
  return {
    resizable: true,
    ...props.vxeTableProps?.columnConfig,
  }
})

const mergeVirtualYConfig = computed(() => {
  return {
    enabled: true,
    gt: 0,
    ...props.vxeTableProps?.virtualYConfig,
  }
})

const mergeVxeTableProps = computed(() => {
  return {
    showOverflow: false,
    showHeaderOverflow: true,
    showFooterOverflow: true,
    footerData: footerDataComputed.value,
    columnConfig: mergeColumnConfig.value,
    virtualYConfig: mergeVirtualYConfig.value,
    ...props.vxeTableProps,
  }
})

/* ----------------------------------- 合计 ----------------------------------- */
const footerDataComputed = computed<VxeTablePropTypes.FooterData>(() => {
  const footerData: any[] = [{}]
  props.tableColumn.forEach((column, index) => {
    if (index === 0) {
      footerData[0][column.field] = '合计'
      return
    }
    if (column.isSummaryCol && tableData.value) {
      footerData[0][column.field] = 0
      tableData.value.forEach((row) => {
        const value: number = Number(row[column.field])
        // if (typeof value === 'number' && !isNaN(value)) {
        footerData[0][column.field] += value
        // }
      })
    }
  })
  return footerData
})

/* ----------------------------------- 分页 ----------------------------------- */
const pageIndex = ref(1)
const pageSize = ref(20)
const total = ref(0)
function handleSizeChange() {
  pageIndex.value = 1
  mergeSearch()
}
function handleIndexChange() {
  mergeSearch()
}

/* ----------------------------------- 工具栏 ---------------------------------- */
const toolbarRef = ref<VxeToolbarInstance>()

onMounted(() => {
  const $table = tableRef.value
  const $toolbar = toolbarRef.value
  if ($table && $toolbar) {
    $table.connect($toolbar)
  }
  mergeSearch()
})

defineExpose({
  tableRef,
  searchFormRef,
  initSearchFormData: searchFormRef.value?.initSearchFormData,
  onSearch: searchFormRef.value?.onSearch,
  onReset: searchFormRef.value?.onReset,
})
</script>

<style lang="scss" scoped>
.haozi-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}

.haozi-table-container {
  height: 100%;
}

.haozi-table-footer {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
.haozi-table-search-card {
  &:deep(.el-card__body) {
    padding-bottom: 0;
  }
}
.haozi-table-card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  margin-top: 10px;
  &:deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 0;
    overflow: hidden;
    .haozi-table-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &:deep(.el-card__footer) {
    padding-top: 0;
    padding-bottom: 0;
    flex-shrink: 0;
  }
}
</style>

<style lang="scss">
@import './theme.scss';
</style>
