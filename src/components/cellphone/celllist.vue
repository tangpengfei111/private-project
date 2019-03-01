<template>
    <el-table
        :data="listData"
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
                <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        props:['addIssHow'],
        data() {
            return {

            }
        },
        created() {
            this.$store.dispatch('getCellList',this.listData)
        },
        computed: {
            listData() {
                return this.$store.state.list;
            }
        },
        methods: {
            handleClick() {
                console.log(1)
            }
        }
    }
</script>

<style scoped>

</style>