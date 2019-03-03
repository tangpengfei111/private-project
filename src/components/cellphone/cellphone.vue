<template>
    <el-container class='box'>
        <el-aside width="200px">
            <my-menu></my-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
</template>

<script>
    import menu from './menu.vue'
    export default {
        components: {
            'my-menu': menu
        }
    }
</script>

<style scoped>
    .box {
        height: 100%;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
    }
</style>