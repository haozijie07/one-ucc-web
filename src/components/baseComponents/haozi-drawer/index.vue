<template>
  <el-drawer
    header-class="el-drawer-header"
    v-model="drawerVisible"
    :size="'50%'"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="onClose"
  >
    <template #header>
      <div class="el-drawer-title">{{ props.headerTitle }}</div>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="el-drawer-footer">
          <el-button @click="onClose">取消</el-button>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>

<script setup lang="tsx">
const props = defineProps<{
  headerTitle: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const drawerVisible = defineModel('drawerVisible', {
  default: false,
})

function onClose() {
  drawerVisible.value = false
}

function onConfirm() {
  emit('confirm')
}
</script>

<style scoped lang="scss">
.el-drawer-header {
  margin-bottom: 0;
  .el-drawer-title {
    color: rgb(17, 17, 17);
    font-weight: 600;
  }
}
</style>
