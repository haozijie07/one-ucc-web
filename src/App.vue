<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useChangeColor } from '@/utils/calc-color'

const primaryColor = '#4caf50'
const { getLightColor, getDarkColor } = useChangeColor()
for (let i = 1; i <= 9; i++) {
  document.body.style.setProperty(
    `--el-color-primary-light-${i}`,
    getLightColor(primaryColor, i / 10),
  )
  document.body.style.setProperty(
    `--el-color-primary-dark-${i}`,
    getDarkColor(primaryColor, i / 10),
  )
}
document.body.style.setProperty('--vxe-ui-font-primary-color', primaryColor)
document.body.style.setProperty('--vxe-ui-font-primary-darken-color', primaryColor)
document.body.style.setProperty(
  '--vxe-ui-font-primary-lighten-color',
  getLightColor(primaryColor, 0.1),
)
document.body.style.setProperty(
  '--vxe-ui-font-primary-disabled-color',
  getLightColor(primaryColor, 0.5),
)
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}
</style>
