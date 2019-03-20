<template>
    <div class='list_box'>
        <div class='list'>
            <div class='til'>{{til}}</div>
            <el-table :data='listdata' style="width: 100%">
                <el-table-column v-if='flag' prop="name" label="持有人" width="180" color='black'></el-table-column>
                <el-table-column v-if='flag2' prop="appName" label="应用名称" width="150"></el-table-column>
                <el-table-column prop="system" label="操作系统" ></el-table-column>
                <el-table-column v-if='flag' prop="enrollDate" label="注册日期" width="200"></el-table-column>
                <el-table-column v-if='flag2' prop="count" label="安装次数" width="130"></el-table-column>
                <el-table-column v-if='flag2' prop="version" label="版本号" width="130"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        props:['listdata','til'],
        data() {
            return {
                flag: true,
                flag2: false
            }
        },
        methods: {
            isShow() {
                if(this.til == '应用商店应用安装统计') {
                    this.flag = false;
                    this.flag2 = true;
                }else {
                    this.flag = true;
                    this.flag2 = false;
                }
            }
        },
        created() {
            this.isShow();
        }
    }
</script>

<style scoped lang='less'>
   .list_box {
        height: 100%;
        .list {
            min-width: 300px;
            height: 100%;
            background: #fff;
            padding: 0 15px;
            .til {
                width: 100%;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #ebeef5;
                font-size: 16px;
                color: rgb(26, 25, 25);
                font-weight: 600;
                padding: 10px 0;
            }
        }
   }
</style>