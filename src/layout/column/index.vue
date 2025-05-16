<template>
  <div class="haozi-layout-column">
    <el-container>
      <el-header>
        <haozi-layout-column-header />
      </el-header>
      <el-main>
        <haozi-layout-main />
      </el-main>
      <el-footer>
        <haozi-layout-footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="tsx" name="haoziLayoutColumn">
import haoziLayoutColumnHeader from './components/layout-header.vue'
import haoziLayoutFooter from './components/layout-footer.vue'
import haoziLayoutMain from './components/layout-main.vue'
</script>

<style scoped lang="scss">
.haozi-layout-column {
  height: 100%;

  .el-container {
    height: 100%;

    .el-footer {
      height: 30px;
    }
  }
}
</style>
