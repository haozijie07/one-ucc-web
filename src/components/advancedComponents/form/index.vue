<template>
  <el-form
    ref="formRef"
    label-width="auto"
    class="haozi-form"
    validate-on-rule-change
    v-bind="props.formProps"
    :model="formData"
  >
    <template v-for="item in formConfigComputed" :key="item.prop">
      <el-form-item
        :label="item.label + ':'"
        :prop="item.prop"
        :rules="item.rules"
        :disabled="item.disabled"
        v-bind="item.props"
      >
        <template v-if="item.type === 'number'">
          <el-input-number
            v-model="formData[item.prop]"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select
            v-model="formData[item.prop]"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          >
            <el-option
              v-for="option in item.options"
              :label="option.label"
              :value="option.value"
              :key="option.value"
            />
          </el-select>
        </template>
        <template v-else-if="item.type === 'checkbox'">
          <el-checkbox-group
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          >
            <el-checkbox
              v-for="option in item.options"
              :label="option.label"
              :value="option.value"
              :key="option.value"
            />
          </el-checkbox-group>
        </template>
        <template v-else-if="item.type === 'radio'">
          <el-radio-group
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          >
            <el-radio
              v-for="option in item.options"
              :label="option.label"
              :value="option.value"
              :key="option.value"
            ></el-radio>
          </el-radio-group>
        </template>
        <template v-else-if="item.type === 'switch'">
          <el-switch
            v-model="formData[item.prop]"
            v-bind="item.widgetProps"
            :disabled="item.disabled"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'date'">
          <el-date-picker
            v-model="formData[item.prop]"
            type="date"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'datetime'">
          <el-date-picker
            v-model="formData[item.prop]"
            type="datetime"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'daterange'">
          <el-date-picker
            v-model="formData[item.prop]"
            type="daterange"
            :clearable="true"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'datetimerange'">
          <el-date-picker
            v-model="formData[item.prop]"
            type="datetimerange"
            :clearable="true"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'textarea'">
          <el-input
            v-model="formData[item.prop]"
            :rows="4"
            type="textarea"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
        <template v-else-if="item.type === 'custom' && item.render">
          <component :is="item.render(item.prop, formData)" />
        </template>
        <template v-else>
          <el-input
            v-model="formData[item.prop]"
            :clearable="true"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            v-bind="item.widgetProps"
            style="width: 100%"
          />
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { FormInstance, FormProps } from 'element-plus'

const props = defineProps<{
  formConfig: IFormConfig[]
  formProps?: Partial<FormProps>
}>()

const formConfigComputed = computed(() => {
  const placeholderMap: Record<widgetType, string> = {
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
  return props.formConfig.map((item) => {
    return {
      ...item,
      placeholder: item.placeholder || placeholderMap[item.type] + item.label,
      startPlaceholder: item.startPlaceholder || placeholderMap[item.type] + '开始' + item.label,
      endPlaceholder: item.endPlaceholder || placeholderMap[item.type] + '结束' + item.label,
    }
  })
})

const formData = defineModel<Record<string, any>>({ required: true })

const formRef = ref<FormInstance>()

async function validate() {
  return await formRef.value?.validate().catch(() => {})
}

async function resetFields() {
  formRef.value?.resetFields()
}

defineExpose({
  formRef: formRef,
  validate: validate,
  resetFields: resetFields,
})
</script>
