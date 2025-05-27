<template>
  <el-cascader style="width: 100%" :options="regionData" :placeholder="props.placeholder">
  </el-cascader>
</template>

<script setup lang="tsx">
import { regionData } from 'element-china-area-data'

const props = defineProps<{
  placeholder?: string
}>()
</script>

<style scoped lang="scss"></style>
