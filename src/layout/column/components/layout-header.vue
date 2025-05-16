<template>
  <div class="haozi-layout-column-header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-sub-menu index="System">
        <template #title>系统管理</template>
        <el-menu-item index="User">用户管理</el-menu-item>
        <el-menu-item index="Role">角色管理</el-menu-item>
        <el-menu-item index="Dict">字典管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="tsx" name="haoziLayoutColumnHeader">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string) => {
  ElMessage.info(`点击了 ${key}`)
}
</script>

<style scoped lang="scss">
.haozi-layout-column-header {
  height: 100%;
  width: 100%;
}
</style>
