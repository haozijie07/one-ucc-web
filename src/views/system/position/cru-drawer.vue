<template>
  <HaoziDrawer
    v-model:drawerVisible="drawerVisible"
    :header-title="headerTitle"
    @confirm="handleConfirm"
    @close="resetFormData"
    :footerVisible="!disabled"
  >
    <haozi-form
      :form-props="{ disabled: disabled }"
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
import { PositionControllerCreate, PositionControllerUpdate } from '@/api/system/api'
import { deepClone } from '@/utils/common-fn'
import { isFalse } from '@/utils/is'

const formRef = useTemplateRef('formRef')
const drawerVisible = ref(false)
const { formData, resetFormData } = useFormData({
  id: '',
  name: '',
  sort: 0,
  isEnable: true,
  createdAt: '',
  createdBy: '',
  updatedAt: '',
})

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const formConfig = ref<IFormConfig[]>([
  {
    prop: 'name',
    label: '职位名称',
    type: 'text',
    rules: [{ required: true, message: '职位名称不能为空' }],
  },
  {
    prop: 'code',
    label: '职位编码',
    type: 'text',
  },
  {
    prop: 'description',
    label: '职位描述',
    type: 'text',
  },
  {
    prop: 'category',
    label: '职位类别',
    type: 'text',
  },
  {
    prop: 'jobType',
    label: '职位性质',
    type: 'text',
  },
  {
    prop: 'departmentIds',
    label: '关联部门',
    type: 'multiselect',
    optionsType: 'department',
  },
  {
    prop: 'sort',
    label: '排序',
    type: 'number',
    rules: [{ required: true, message: '排序不能为空' }],
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
    prop: 'remark',
    label: '备注',
    type: 'text',
  },
])

async function handleConfirm() {
  console.log(formRef.value?.validate())

  formRef.value?.validate().then(async (validate) => {
    console.log('%c⧭', 'color: #73998c', validate)
    if (validate) {
      if (formData.value.id) {
        const res = await PositionControllerUpdate({ id: formData.value.id }, formData.value)
        if (res) {
          ElMessage.success('修改成功')
          drawerVisible.value = false
          resetFormData()
          emits('refresh')
        }
      } else {
        const res = await PositionControllerCreate(formData.value)
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
