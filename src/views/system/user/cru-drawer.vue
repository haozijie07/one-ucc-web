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
import { UserControllerCreate, UserControllerUpdate } from '@/api/system/api'
import { deepClone } from '@/utils/common-fn'
import { isFalse, isIdCard } from '@/utils/is'

const formRef = useTemplateRef('formRef')
const drawerVisible = ref(false)
const { formData, resetFormData } = useFormData({
  id: '',
  username: '',
  password: '',
  name: '',
  email: '',
  mobile: '',
  sex: '',
  address: '',
  nativeAddress: '',
  idCard: '',
  isEnable: true,
  joinTime: '',
  position: '',
  education: '',
  graduateSchool: '',
  emergencyContacts: '',
  emergencyContactPhone: '',
  politicalStatus: '',
  birthday: '',
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
    rules: [
      { required: true, message: '邮箱不能为空' },
      {
        validator: (rule, value, callback) => {
          if (!value) {
            callback()
          } else {
            if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
              callback('邮箱格式不正确')
            } else {
              callback()
            }
          }
        },
      },
    ],
  },
  {
    prop: 'mobile',
    label: '手机号',
    type: 'text',
    rules: [
      { required: true, message: '手机号不能为空' },
      {
        validator: (rule, value, callback) => {
          if (value) {
            if (!/^1[3-9]\d{9}$/.test(value)) {
              callback(new Error('手机号格式不正确'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        },
      },
    ],
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
    rules: [
      { required: true, message: '身份证号码不能为空' },
      {
        validator: (rule, value, callback) => {
          if (value) {
            if (!isIdCard(value)) {
              callback(new Error('请输入正确的身份证号码'))
            } else {
              callback()
            }
          }
        },
      },
    ],
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
    prop: 'departmentId',
    label: '部门',
    type: 'select',
    optionsType: 'department',
    rules: [{ required: true, message: '部门不能为空' }],
  },
  {
    prop: 'position',
    label: '职位',
    type: 'text',
    rules: [{ required: true, message: '职位不能为空' }],
  },
  {
    prop: 'education',
    label: '学历',
    type: 'select',
    options: [
      { label: '初中', value: '初中' },
      { label: '高中', value: '高中' },
      { label: '大专', value: '大专' },
      { label: '本科', value: '本科' },
      { label: '硕士', value: '硕士' },
      { label: '博士', value: '博士' },
    ],
    rules: [{ required: true, message: '学历不能为空' }],
  },
  {
    prop: 'graduateSchool',
    label: '毕业院校',
    type: 'text',
    rules: [{ required: true, message: '毕业院校不能为空' }],
  },
  {
    prop: 'emergencyContacts',
    label: '紧急联系人',
    type: 'text',
    rules: [{ required: true, message: '紧急联系人不能为空' }],
  },
  {
    prop: 'emergencyContactPhone',
    label: '紧急联系人电话',
    type: 'text',
    rules: [
      { required: true, message: '紧急联系人电话不能为空' },
      {
        validator: (rule, value, callback) => {
          if (value) {
            if (!/^1[3-9]\d{9}$/.test(value)) {
              callback(new Error('手机号格式不正确'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        },
      },
    ],
  },
  {
    prop: 'idPhoto',
    label: '身份证照片',
    type: 'text',
  },
  {
    prop: 'bankCard',
    label: '银行卡账号',
    type: 'text',
  },
  {
    prop: 'bankCardPhoto',
    label: '银行卡照片',
    type: 'text',
  },
  {
    prop: 'resume',
    label: '简历',
    type: 'text',
  },
  {
    prop: 'politicalStatus',
    label: '政治面貌',
    type: 'radio',
    options: [
      {
        label: '党员',
        value: '党员',
      },
      {
        label: '团员',
        value: '团员',
      },
      {
        label: '群众',
        value: '群众',
      },
    ],
    rules: [{ required: true, message: '政治面貌不能为空' }],
  },
  {
    prop: 'status',
    label: '在职状态',
    type: 'select',
    options: [
      {
        label: '实习',
        value: '实习',
      },
      {
        label: '试用期',
        value: '试用期',
      },
      {
        label: '在职',
        value: '在职',
      },
      {
        label: '离职',
        value: '离职',
      },
    ],
  },
  {
    prop: 'birthday',
    label: '生日',
    type: 'date',
    rules: [{ required: true, message: '生日不能为空' }],
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
        const res = await UserControllerUpdate({ id: formData.value.id }, formData.value)
        if (res) {
          ElMessage.success('修改成功')
          drawerVisible.value = false
          resetFormData()
          emits('refresh')
        }
      } else {
        const res = await UserControllerCreate(formData.value)
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
