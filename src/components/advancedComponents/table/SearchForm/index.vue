<template>
  <div class="haozi-table-search">
    <el-form ref="formRef" :model="searchFormData" label-width="auto">
      <el-row :gutter="20">
        <template v-for="(searchItem, searchIndex) in tableSearchComputed" :key="searchItem.field">
          <el-col v-if="searchIndex < 6" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item
              :label="searchItem.title"
              :prop="`${searchItem.field}_value`"
              :rules="searchItem.rules"
            >
              <div style="display: flex; width: 100%">
                <el-select
                  style="width: 120px; margin: 0 10px; flex-shrink: 0"
                  v-model="searchFormData[`${searchItem.field}_operator`]"
                  :placeholder="searchItem.placeholder"
                  v-bind="searchItem.itemProps"
                >
                  <el-option
                    v-for="item in operatorMap.get(searchItem.type)"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  >
                  </el-option>
                </el-select>
                <template v-if="searchItem.type === 'text'">
                  <el-input
                    style="flex-grow: 1"
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    :placeholder="searchItem.placeholder"
                    v-bind="searchItem.itemProps"
                  />
                </template>
                <template v-else-if="searchItem.type === 'number'">
                  <el-input-number
                    style="flex-grow: 1"
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    :min="-99999"
                    :max="99999"
                    :placeholder="searchItem.placeholder"
                    v-bind="searchItem.itemProps"
                  />
                </template>
                <template v-else-if="searchItem.type === 'select'">
                  <el-select
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    :placeholder="searchItem.placeholder"
                    v-bind="searchItem.itemProps"
                  >
                    <el-option
                      v-for="item in searchItem.options"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value"
                    />
                  </el-select>
                </template>
                <template v-else-if="searchItem.type === 'multiselect'">
                  <el-select
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    :placeholder="searchItem.placeholder"
                    :multiple="true"
                    v-bind="searchItem.itemProps"
                  >
                    <el-option
                      v-for="item in searchItem.options"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value"
                    />
                  </el-select>
                </template>
                <template v-else-if="searchItem.type === 'radio'">
                  <el-radio-group
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    v-bind="searchItem.itemProps"
                  >
                    <el-radio
                      v-for="item in searchItem.options"
                      :value="item.value"
                      :key="item.value"
                    >
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                </template>
                <template v-else-if="searchItem.type === 'checkbox'">
                  <el-checkbox-group
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    v-bind="searchItem.itemProps"
                  >
                    <el-checkbox-button
                      v-for="item in searchItem.options"
                      :value="item.value"
                      :key="item.value"
                      :label="item.label"
                    />
                  </el-checkbox-group>
                </template>
                <template v-else-if="searchItem.type === 'date'">
                  <el-date-picker
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    type="date"
                    :placeholder="searchItem.placeholder"
                    style="flex-grow: 1"
                    v-bind="searchItem.itemProps"
                  />
                </template>
                <template v-else-if="searchItem.type === 'datetime'">
                  <el-date-picker
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    type="datetime"
                    :placeholder="searchItem.placeholder"
                    style="flex-grow: 1"
                    v-bind="searchItem.itemProps"
                  />
                </template>
                <template v-else-if="searchItem.type === 'daterange'">
                  <el-date-picker
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    type="daterange"
                    :start-placeholder="searchItem.startPlaceholder"
                    :end-placeholder="searchItem.endPlaceholder"
                    style="flex-grow: 1"
                    v-bind="searchItem.itemProps"
                  />
                </template>
                <template v-else-if="searchItem.type === 'datetimerange'">
                  <el-date-picker
                    v-model="searchFormData[`${searchItem.field}_value`]"
                    type="datetimerange"
                    :start-placeholder="searchItem.startPlaceholder"
                    :end-placeholder="searchItem.endPlaceholder"
                    style="flex-grow: 1"
                    v-bind="searchItem.itemProps"
                  />
                </template>
              </div>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { operatorMap } from '../utils/operator-map'
import type { ElForm } from 'element-plus'

const props = defineProps<{
  tableSearch: ITableSearch[]
}>()

const tableSearchComputed = computed(() => {
  const placeholderMap: Record<string, string> = {
    text: '请输入',
    textarea: '请输入',
    select: '请选择',
    date: '请选择',
    datetime: '请选择',
    daterange: '请选择',
    datetimerange: '请选择',
    number: '请输入',
    radio: '请选择',
    checkbox: '请选择',
    switch: '请选择',
    custom: '',
  }
  return props.tableSearch.map((item) => {
    return {
      ...item,
      placeholder: item.placeholder || placeholderMap[item.type] + item.title,
      startPlaceholder: item.startPlaceholder || placeholderMap[item.type] + '开始' + item.title,
      endPlaceholder: item.endPlaceholder || placeholderMap[item.type] + '结束' + item.title,
    }
  })
})

const emits = defineEmits<{
  (e: 'onSearch'): void
  (e: 'onReset'): void
}>()

const formRef = ref<InstanceType<typeof ElForm>>()

const searchFormData = defineModel<any>('searchFormData', { default: {} })

/** 表单初始化 */
function initSearchFormData(prop?: string | string[]) {
  tableSearchComputed.value.forEach((item) => {
    if (prop) {
      if (prop !== item.field) return
      if (Array.isArray(prop) && !prop.includes(item.field)) return
    }

    let operator: Operator, defaultValue

    // 根据类型设置默认操作符和值
    switch (item.type) {
      case 'text':
        operator = 'in'
        break
      case 'number':
        operator = 'eq'
        break
      case 'select':
        operator = 'eq'
        break
      case 'multiselect':
        operator = 'in'
        defaultValue = []
        break
      case 'checkbox':
        operator = 'in'
        defaultValue = []
        break
      case 'daterange':
      case 'datetimerange':
        operator = 'between'
        defaultValue = []
        break
      default:
        operator = 'eq'
        defaultValue = ''
    }

    searchFormData.value[`${item.field}_field`] = item.field
    searchFormData.value[`${item.field}_operator`] = item.operator || operator
    searchFormData.value[`${item.field}_value`] = item.defaultValue ?? defaultValue
  })
}

function handleSearch() {
  formRef.value
    ?.validate()
    .then(() => {
      emits('onSearch')
    })
    .catch(() => {
      console.log('error submit!!')
      return false
    })
}
function handleReset() {
  emits('onReset')
}

onMounted(() => {
  initSearchFormData()
  handleSearch()
})

defineExpose({
  initSearchFormData,
  onSearch: handleSearch,
  onReset: handleReset,
})
</script>

<style scoped>
.haozi-table-search {
  flex-shrink: 0;
  overflow: hidden;
}
</style>
