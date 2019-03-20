<template>
    <el-main>
        <el-table 
            :data="adminList.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
            height="450" 
            highlight-current-row='true'>
            <el-table-column prop="user_name" label="管理员帐户" width="180" align='center'></el-table-column>
            <el-table-column prop="user_phone" label="手机号码" width="180" align='center'></el-table-column>
            <el-table-column prop="user_mail" label="邮箱地址" width="280" align='center'></el-table-column>
            <el-table-column prop="registerTime" label="注册日期" width="280" align='center'></el-table-column>
            <el-table-column prop="user_permissions" label="管理级别" width="160" align='center'></el-table-column>
        </el-table>
        <div class='pag'>
            <el-pagination
                background
                :total="total"
                layout="prev, pager, next"
                :page-size="pagesize"
                @current-change='currentChange'>
            </el-pagination>
        </div>
    </el-main>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                pagesize:8,
                currentPage:1
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() { 
                this.$store.dispatch('getAdminList');
            },
            currentChange(val) {
                this.currentPage = val;
            }
        },
        computed: {
            ...mapState(['adminList']),
            total() {
                return this.adminList.length + 1;
            }
        }
    }
</script>

<style scoped>
    .el-table {
        padding: 5px 20px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
    .pag {
        text-align: center;
        margin-top: 20px;
    }
</style>