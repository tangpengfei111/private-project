<template>
    <el-container>
        <el-header>
            <my-search til='group' ref='mychild'></my-search>
        </el-header>
        <el-main>
            <el-table
                :data="groupData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @select='selectChange'
                @select-all='selectChangeAll'>
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="设备分组"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    align="center"
                    label="设备组描述">
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
        </el-main>
    </el-container>
</template>

<script>
    import search from './search'
    export default {
        data() {
            return {
                pagesize:6,
                currentPage:1,
                selectAry:[]
            }
        },
        components: {
            'my-search': search
        },
        created() {
            this.$store.dispatch('getCellphoneList')
        },
        computed: {
            groupData() {
                return this.$store.state.cellphoneGroup;
            },
            total() {
                return this.$store.state.cellphoneGroup.length + 1;
            }
        },
        methods: {
            editor(row) {
                this.$refs.mychild.callout(row);
            },
            del(row) {
                this.$store.dispatch('delCellphoneGroupData',row);
            },
            currentChange(currentPage){
                this.currentPage = currentPage;
            },
            selectChange(row) {
                if (row[0]) {
                    row[0].isSelect = true
                    this.selectObj.push[row[0]]
                }else {

                }
                console.log(row)
            },
            selectChangeAll(row) {
                console.log(row)
            }
        }
    }
</script>

<style scoped lang='less'>
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
    }
</style>