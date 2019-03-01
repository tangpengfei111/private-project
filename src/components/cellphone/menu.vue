<template>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index='cellphone'>
        <i class="el-icon-menu"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
      <el-menu-item index="group">
        <i class="el-icon-document"></i>
        <span slot="title">设备分组</span>
      </el-menu-item>
      <!-- 添加设备 路由 从 设备管理 添加设备按钮点击跳转 -->
    </el-menu>
</template>

<script>
    export default {
        computed: {
            defaultActive() {
                return this.$route.path.replace('/','')
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo {
        height: 540px;
    }
</style>