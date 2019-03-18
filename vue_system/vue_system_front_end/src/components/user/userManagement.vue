<template>
    <el-container>
        <el-main>
            <my-userList></my-userList>
        </el-main>
    </el-container>
</template>

<script>
    import userList from './userList.vue'
    export default {
        components: {
            'my-userList': userList
        }
    }
</script>

<style scoped>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>