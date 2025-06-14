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
import { DictTypeControllerCreate, DictTypeControllerUpdate } from '@/api/system/api'
import { deepClone } from '@/utils/common-fn'
import { isFalse } from '@/utils/is'

const formRef = useTemplateRef('formRef')
const drawerVisible = ref(false)
const { formData, resetFormData } = useFormData({
  id: '',
  code: '',
  name: '',
  isEnable: true,
  sort: 0,
})

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const formConfig = ref<IFormConfig[]>([
  {
    prop: 'code',
    label: '编码',
    type: 'text',
    rules: [{ required: true, message: '编码不能为空' }],
  },
  {
    prop: 'name',
    label: '名称',
    type: 'text',
    rules: [{ required: true, message: '名称不能为空' }],
  },
  {
    prop: 'description',
    label: '说明',
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
    prop: 'sort',
    label: '排序',
    type: 'number',
    rules: [{ required: true, message: '排序不能为空' }],
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
        const res = await DictTypeControllerUpdate({ id: formData.value.id }, formData.value)
        if (res) {
          ElMessage.success('修改成功')
          drawerVisible.value = false
          resetFormData()
          emits('refresh')
        }
      } else {
        const res = await DictTypeControllerCreate(formData.value)
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
