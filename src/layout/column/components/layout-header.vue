<template>
  <div class="haozi-layout-column-header">
    <el-menu
      :default-active="activeIndex"
      class="haozi-layout-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="home">首页</el-menu-item>
      <el-sub-menu index="system">
        <template #title>系统管理</template>
        <el-menu-item index="user">用户管理</el-menu-item>
        <el-menu-item index="role">角色管理</el-menu-item>
        <el-menu-item index="dict">字典管理</el-menu-item>
        <el-menu-item index="department">部门管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <el-dropdown class="haozi-user">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click="handleLayout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="tsx" name="haoziLayoutColumnHeader">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/** 获取当前路由信息 */
const route = useRoute()
const activeIndex = ref(route.name || 'home')

/** 操作路由 */
const router = useRouter()
const handleSelect = (key: string) => {
  router.push({
    name: key,
  })
}

function handleLayout() {
  router.push({
    name: 'login',
  })
}
</script>

<style scoped lang="scss">
.haozi-layout-column-header {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;

  .haozi-layout-menu {
    flex-grow: 1;
  }

  .haozi-user {
    .el-avatar {
      cursor: pointer;
    }
  }
}
</style>
