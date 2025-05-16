<template>
  <div class="haozi-layout-column-header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-sub-menu index="system">
        <template #title>系统管理</template>
        <el-menu-item index="user">用户管理</el-menu-item>
        <el-menu-item index="role">角色管理</el-menu-item>
        <el-menu-item index="dict">字典管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="tsx" name="haoziLayoutColumnHeader">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/** 获取当前路由信息 */
const route = useRoute()
const activeIndex = ref(route.name)

/** 操作路由 */
const router = useRouter()
const handleSelect = (key: string) => {
  router.push({
    name: key,
  })
}
</script>

<style scoped lang="scss">
.haozi-layout-column-header {
  height: 100%;
  width: 100%;
}
</style>
