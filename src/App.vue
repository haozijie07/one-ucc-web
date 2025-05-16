<template>
  <el-config-provider :locale="zhCn">
    <haozi-layout-column />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import haoziLayoutColumn from '@/layout/column/index.vue'
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}
</style>
