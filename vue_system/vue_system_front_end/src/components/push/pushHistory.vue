<template>
   <el-container>
        <el-header>
            <el-button type="danger" size="small" @click='del'>清除记录</el-button>
        </el-header>
        <el-main>
            <el-table
                :data="pushData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                @selection-change='selectChange'>
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="title"
                    align="center"
                    label="标题"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="content"
                    align="center"
                    label="内容"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="class"
                    align="center"
                    label="消息类型"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="group"
                    align="center"
                    label="对象分组"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="groupname"
                    align="center"
                    label="分组名称"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="time"
                    align="center"
                    label="发送时间"
                    width="170">
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
    export default {
        data() {
            return {
                pagesize:6,
                currentPage:1,
                delAry:[]
            }
        },
        created() {
            this.$store.dispatch('getPushHistory')
            console.log(this.pushData)
        },
        computed: {
            pushData() {
                return this.$store.state.pushHistoryList;
            },
            total() {
                return this.pushData.length + 1;
            }
        },
        methods: {
            selectChange(row) {
                this.delAry = row;
                
            },
            currentChange(currentPage) {
                this.currentPage = currentPage;
            },
            del() {
                if (this.delAry) {
                    this.$store.dispatch('delPushHistory',this.delAry)
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        /* text-align: center; */
        line-height: 60px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>