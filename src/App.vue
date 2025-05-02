<template>
  <el-config-provider :locale="zhCn">
    <button @click="handleGetAllUser">添加用户</button>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import service from './request/service'

function handleGetAllUser() {
  service
    .post('http://localhost:3000/user')
    .then((response) => {
      console.log('%c⧭', 'color: #00e600', response)
    })
    .catch((err) => {
      console.log('%c⧭', 'color: #aa00ff', err)
    })
}
</script>

<style scoped lang="scss"></style>
