<template>
    <div>
        <el-table
            :data="listData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
                prop="cellphoneModel"
                align="center"
                label="设备型号"
                sortable
                width='170'>
            </el-table-column>
            <el-table-column
                prop="name"
                label="持有人"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="cellphoneGroup"
                align="center"
                label="设备分组"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                prop="systemVersion"
                align="center"
                label="操作系统"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
                prop="enrollDate"
                align="center"
                label="注册日期"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
                prop="strategyGroup"
                align="center"
                label="策略分组">
            </el-table-column>
            <el-table-column
                prop="operator"
                align="center"
                label="运营商"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                prop="state"
                align="center"
                label="状态"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="editor(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click='del(scope.row)' type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination
            background
            :total="total"
            layout="prev, pager, next"
            :page-size="pagesize"
            @current-change='currentChange'>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        props:['addIssHow'],
        data() {
            return {
                pagesize:5,
                currentPage:1
            }
        },
        created() {
            this.$store.dispatch('getCellList')
            
        },
        computed: {
            listData() {
                return this.$store.state.cellphoneMessage;
            },
            total() {
                return this.$store.state.cellphoneMessage.length + 1;
            }

        },
        methods: {
            editor(row) {
                this.$router.push({path:'/addList',query:row})
            },
            del(row) {
                this.$store.dispatch('delCellphone',row)
            },
            currentChange(currentPage){
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style scoped>

</style>