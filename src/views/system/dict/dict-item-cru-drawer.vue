<template>
  <HaoziDrawer
    v-model:drawerVisible="drawerVisible"
    :header-title="headerTitle"
    @confirm="handleConfirm"
    @close="resetFormData"
    :footerVisible="!disabled"
  >
    <haozi-form
      :form-props="{ disabled }"
      ref="formRef"
      :form-config="formConfig"
      v-model="formData"
    >
    </haozi-form>
  </HaoziDrawer>
</template>

<script setup lang="tsx">
import { HaoziDrawer } from '@/components/baseComponents'
import { HaoziForm } from '@/components/advancedComponents/index'
import { useFormData } from '@/hooks/formData'
import { ref, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'
import { DictItemControllerCreate, DictItemControllerUpdate } from '@/api/system/api'
import { deepClone } from '@/utils/common-fn'
import { isFalse } from '@/utils/is'

const formRef = useTemplateRef('formRef')
const drawerVisible = ref(false)
const { formData, resetFormData } = useFormData({
  id: '',
  dictTypeId: '',
  value: '',
  label: '',
  isEnable: true,
  isDefault: false,
  sort: 0,
})

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const formConfig = ref<IFormConfig[]>([
  {
    prop: 'dictTypeId',
    label: '字典类型',
    type: 'select',
    rules: [{ required: true, message: '字典类型不能为空' }],
    optionsType: 'dictType',
    disabled: true,
  },
  {
    prop: 'value',
    label: '存储值',
    type: 'text',
    rules: [{ required: true, message: '存储值不能为空' }],
  },
  {
    prop: 'label',
    label: '显示名称',
    type: 'text',
    rules: [{ required: true, message: '显示名称不能为空' }],
  },
  {
    prop: 'description',
    label: '描述',
    type: 'text',
  },
  {
    prop: 'isEnable',
    label: '是否启用',
    type: 'switch',
    rules: [{ required: true, message: '是否启用不能为空' }],
    options: [
      {
        label: '启用',
        value: '1',
      },
      {
        label: '禁用',
        value: '0',
      },
    ],
  },
  {
    prop: 'isDefault',
    label: '是否默认',
    type: 'switch',
    rules: [{ required: true, message: '是否默认不能为空' }],
    options: [
      {
        label: '启用',
        value: '1',
      },
      {
        label: '禁用',
        value: '0',
      },
    ],
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'number',
    rules: [{ required: true, message: '排序不能为空' }],
  },
  {
    prop: 'color',
    label: '颜色样式',
    type: 'text',
  },
])

async function handleConfirm() {
  console.log(formRef.value?.validate())

  formRef.value?.validate().then(async (validate) => {
    console.log('%c⧭', 'color: #73998c', validate)
    if (validate) {
      if (formData.value.id) {
        const res = await DictItemControllerUpdate({ id: formData.value.id }, formData.value)
        if (res) {
          ElMessage.success('修改成功')
          drawerVisible.value = false
          resetFormData()
          emits('refresh')
        }
      } else {
        const res = await DictItemControllerCreate(formData.value)
        if (res) {
          ElMessage.success('添加成功')
          drawerVisible.value = false
          resetFormData()
          emits('refresh')
        }
      }
    }
  })
}

const headerTitle = ref('添加用户')
const disabled = ref(false)
async function openDrawer(title: string, row?: any, isUpdate?: boolean) {
  if (row) formData.value = deepClone(row)
  disabled.value = isFalse(isUpdate) ? true : false

  headerTitle.value = title
  drawerVisible.value = true
}

defineExpose({
  openDrawer,
})
</script>

<style scoped lang="scss"></style>
