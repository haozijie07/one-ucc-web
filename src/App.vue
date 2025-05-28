<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useChangeColor } from '@/utils/calc-color'

const { getLightColor, getDarkColor } = useChangeColor()
for (let i = 1; i <= 9; i++) {
  document.body.style.setProperty(`--el-color-primary-light-${i}`, getLightColor('#4caf50', i / 10))
  document.body.style.setProperty(`--el-color-primary-dark-${i}`, getDarkColor('#4caf50', i / 10))
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}
</style>
