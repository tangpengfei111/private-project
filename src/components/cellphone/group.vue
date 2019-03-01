<template>
    <el-container>
        <el-header>
            <my-search til='group'></my-search>
        </el-header>
        <el-main>
            <el-table
                :data="groupData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="cellphoneGroup"
                    align="center"
                    label="设备分组"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="groupDescribe"
                    align="center"
                    label="设备组描述">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="170">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import search from './search'
    export default {
       components: {
           'my-search': search
       },
       data() {
            return {
                groupData: [{
                cellphoneGroup: '测试',
                groupDescribe: '这是一个测试分组',
                }, {
                cellphoneGroup: '通信连',
                groupDescribe: '按单位进行分组',
                }, {
                cellphoneGroup: '导航连',
                groupDescribe: '按单位进行分组',
                }, {
                cellphoneGroup: '测试',
                groupDescribe: '这是一个测试分组',
                }]
            }
        },
        methods: {
            handleClick() {
                console.log(1)
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