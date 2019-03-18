<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
    <div>{{til}}</div>
  </el-select>
</template>

<script>
export default {
    
   
};
</script>

<style scoped>
</style>