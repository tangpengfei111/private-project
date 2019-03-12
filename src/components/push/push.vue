<template>
    <el-container>
        <el-aside width='200px'>
            <my-menu til='push'></my-menu>
        </el-aside>
        <router-view></router-view>
    </el-container>
</template>

<script>
    import menu from '@/common/menu.vue'
    export default {
        components: {
            'my-menu': menu
        }
    }
</script>

<style scoped>
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
    }
</style>