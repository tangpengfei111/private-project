<template>
  <el-container class='box' >
    <el-aside width="200px">
      <my-menu til='set'></my-menu>
    </el-aside>
    <el-container>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import menu from "@/common/menu";
export default {
  components: {
    "my-menu": menu,
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  border: 1px solid #eeee
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;
}
</style>