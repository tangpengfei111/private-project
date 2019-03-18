<template>
    <el-container>
        <el-header>
            <my-search til='management'></my-search>
        </el-header>
        <el-main>
            <my-celllist></my-celllist>
        </el-main>
    </el-container>
</template>

<script>
    import celllist from './celllist'
    import search from './search'
    export default {
        components: {
            'my-celllist': celllist,
            'my-search': search
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 50px;
    }
    
</style>