<template>
  <div>
    <haozi-table
      ref="tableRef"
      :table-search="tableSearch"
      :table-column="tableColumn"
      :get-data-fn="getDataFn"
      v-model:table-data="tableData"
    >
      <template #table-header-left>
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </template>
    </haozi-table>
    <HaoziDrawer
      v-model:drawerVisible="addEditDetailDrawerVisible"
      :header-title="'新增用户'"
      @confirm="handleConfirm"
    >
      <haozi-form ref="formRef" :form-config="formConfig" v-model="formData"> </haozi-form>
    </HaoziDrawer>
  </div>
</template>

<script setup lang="tsx" name="user">
import { UserControllerCreate, UserControllerPageList } from '@/api/api'
import { HaoziTable, HaoziForm } from '@/components/advancedComponents/index'
import { HaoziDrawer } from '@/components/baseComponents'
import { ElMessage } from 'element-plus'
import { ref, useTemplateRef } from 'vue'

const tableRef = useTemplateRef('tableRef')
const tableSearch = ref<ITableSearch[]>([
  {
    field: 'username',
    title: '用户名',
    type: 'text',
  },
  {
    field: 'name',
    title: '姓名',
    type: 'text',
  },
  {
    field: 'email',
    title: '邮箱',
    type: 'text',
  },
  {
    field: 'mobile',
    title: '手机号',
    type: 'text',
  },
  {
    field: 'sex',
    title: '性别',
    type: 'text',
  },
  {
    field: 'address',
    title: '地址',
    type: 'text',
  },
  {
    field: 'nativeAddress',
    title: '籍贯',
    type: 'text',
  },
  {
    field: 'idCard',
    title: '身份证号码',
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
    field: 'lastLoginAt',
    title: '最后登录时间',
    type: 'datetimerange',
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    type: 'number',
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    type: 'datetimerange',
  },
  {
    field: 'joinTime',
    title: '入职时间',
    type: 'datetimerange',
  },
  {
    field: 'leaveTime',
    title: '离职时间',
    type: 'datetimerange',
  },
  {
    field: 'position',
    title: '职位',
    type: 'text',
  },
  {
    field: 'department',
    title: '部门',
    type: 'text',
  },
  {
    field: 'createdAt',
    title: '创建时间',
    type: 'datetimerange',
  },
  {
    field: 'createdBy',
    title: '创建人',
    type: 'text',
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    type: 'datetimerange',
  },
  {
    field: 'updatedBy',
    title: '更新人',
    type: 'text',
  },
  {
    field: 'deletedAt',
    title: '删除时间',
    type: 'datetimerange',
  },
  {
    field: 'deletedBy',
    title: '删除人',
    type: 'text',
  },
  {
    field: 'remark',
    title: '备注',
    type: 'text',
  },
])
const tableColumn = ref<ITableColumn[]>([
  {
    field: 'username',
    title: '用户名',
    width: 120,
  },
  {
    field: 'name',
    title: '姓名',
    width: 100,
  },
  {
    field: 'avatar',
    title: '头像',
    width: 100,
  },
  {
    field: 'email',
    title: '邮箱',
    width: 100,
  },
  {
    field: 'mobile',
    title: '手机号',
    width: 120,
  },
  {
    field: 'sex',
    title: '性别',
    width: 100,
  },
  {
    field: 'address',
    title: '地址',
    width: 100,
  },
  {
    field: 'nativeAddress',
    title: '籍贯',
    width: 100,
  },
  {
    field: 'idCard',
    title: '身份证号码',
    width: 100,
  },
  {
    field: 'isEnable',
    title: '是否启用',
    width: 100,
  },
  {
    field: 'lastLoginAt',
    title: '最后登录时间',
    width: 130,
  },
  {
    field: 'loginFailCount',
    title: '登录失败次数',
    width: 130,
  },
  {
    field: 'loginLockedUnitl',
    title: '登录锁定时间',
    width: 130,
  },
  {
    field: 'joinTime',
    title: '入职时间',
    width: 100,
  },
  {
    field: 'leaveTime',
    title: '离职时间',
    width: 100,
  },
  {
    field: 'position',
    title: '职位',
    width: 120,
  },
  {
    field: 'department',
    title: '部门',
    width: 100,
  },
  {
    field: 'createdAt',
    title: '创建时间',
    width: 100,
  },
  {
    field: 'createdBy',
    title: '创建人',
    width: 100,
  },
  {
    field: 'updatedAt',
    title: '更新时间',
    width: 100,
  },
  {
    field: 'updatedBy',
    title: '更新人',
    width: 100,
  },
  {
    field: 'deletedAt',
    title: '删除时间',
    width: 100,
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
const tableData = ref<APIUpdateUserDto>([])

async function getDataFn(conditions: any) {
  const res = await UserControllerPageList(conditions)
  if (res) {
    return res
  }
}

const formRef = useTemplateRef('formRef')
const addEditDetailDrawerVisible = ref(false)
const formData = ref<APIUpdateUserDto>({
  isEnable: true,
})
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
function handleAdd() {
  addEditDetailDrawerVisible.value = true
}

async function handleConfirm() {
  formRef.value?.validate().then(async (validate) => {
    if (validate) {
      const res = await UserControllerCreate(formData.value)
      if (res) {
        ElMessage.success('添加成功')
        tableRef.value?.onRefresh?.()
        addEditDetailDrawerVisible.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss"></style>
