<template>
  <HaoziDrawer
    v-model:drawerVisible="drawerVisible"
    :header-title="'新增用户'"
    @confirm="handleConfirm"
    @close="resetFormData"
  >
    <haozi-form ref="formRef" :form-config="formConfig" v-model="formData"> </haozi-form>
  </HaoziDrawer>
</template>

<script setup lang="tsx">
import { HaoziDrawer } from '@/components/baseComponents'
import { HaoziForm } from '@/components/advancedComponents/index'
import { useFormData } from '@/hooks/formData'
import { ref, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'
import { UserControllerCreate } from '@/api/api'

const formRef = useTemplateRef('formRef')
const drawerVisible = ref(false)
const { formData, resetFormData } = useFormData({
  isEnable: true,
})

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const formConfig = ref<IFormConfig[]>([
  {
    prop: 'username',
    label: '用户名',
    type: 'text',
    rules: [{ required: true, message: '用户名不能为空' }],
  },
  {
    prop: 'name',
    label: '姓名',
    type: 'text',
    rules: [{ required: true, message: '姓名不能为空' }],
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'text',
    rules: [{ required: true, message: '邮箱不能为空' }],
  },
  {
    prop: 'mobile',
    label: '手机号',
    type: 'text',
    rules: [{ required: true, message: '手机号不能为空' }],
  },
  {
    prop: 'sex',
    label: '性别',
    type: 'radio',
    rules: [{ required: true, message: '性别不能为空' }],
    options: [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
    ],
  },
  {
    prop: 'address',
    label: '地址',
    type: 'textarea',
    rules: [{ required: true, message: '地址不能为空' }],
    // render() {
    //   return (
    //     <ChinaAreaCascader
    //       v-model={formData.value.address}
    //       placeholder="请选择地址"
    //     ></ChinaAreaCascader>
    //   )
    // },
  },
  {
    prop: 'nativeAddress',
    label: '籍贯',
    type: 'textarea',
    rules: [{ required: true, message: '籍贯不能为空' }],
    // render() {
    //   return (
    //     <ChinaAreaCascader
    //       v-model={formData.value.nativeAddress}
    //       placeholder="请选择籍贯"
    //     ></ChinaAreaCascader>
    //   )
    // },
  },
  {
    prop: 'idCard',
    label: '身份证号码',
    type: 'text',
    rules: [{ required: true, message: '身份证号码不能为空' }],
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
    prop: 'joinTime',
    label: '入职时间',
    type: 'datetime',
    rules: [{ required: true, message: '入职时间不能为空' }],
  },
  {
    prop: 'leaveTime',
    label: '离职时间',
    type: 'datetime',
  },
  {
    prop: 'department',
    label: '部门',
    type: 'text',
    rules: [{ required: true, message: '部门不能为空' }],
  },
  {
    prop: 'position',
    label: '职位',
    type: 'text',
    rules: [{ required: true, message: '职位不能为空' }],
  },
  {
    prop: 'remark',
    label: '备注',
    type: 'text',
  },
])

async function handleConfirm() {
  formRef.value?.validate().then(async (validate) => {
    if (validate) {
      const res = await UserControllerCreate(formData.value)
      if (res) {
        ElMessage.success('添加成功')
        drawerVisible.value = false
        resetFormData()
        emits('refresh')
      }
    }
  })
}

async function openDrawer() {
  drawerVisible.value = true
}

defineExpose({
  openDrawer,
})
</script>

<style scoped lang="scss"></style>
