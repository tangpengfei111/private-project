<template>
    <div class='biglist'>
        <div class='til'>登录失败</div>
        <my-date></my-date>
        <el-table :data="tableData" style="width: 100%">
        <el-table-column 
            prop="date" 
            label="账户名" 
            width="300"
            align='center'>
        </el-table-column>
        <el-table-column 
            prop="name" 
            label="操作系统" 
            width="500"
            align='center'>
        </el-table-column>
        <el-table-column 
            prop="address" 
            label="失败次数"
            align='center'>
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import date from './date.vue'
    export default {
        props:['tableData'],
        components: {
            'my-date': date
        }
    }
</script>

<style scoped lang='less'>
    .biglist {
        padding: 0 15px;
        .til {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: rgb(26, 25, 25);
            border-bottom: 1px solid #ebeef5;
            font-weight: 600;
            padding: 10px 0;
        }
    }
</style>