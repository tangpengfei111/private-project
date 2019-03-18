<template>
    <div class='register'>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="left">
                    <my-list til='注册的新设备' :listdata='messageData'></my-list>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right">    
                    <my-list til='应用商店应用安装统计' :listdata='messageData'></my-list>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import list from './list.vue'
    export default {
        data() {
            return {
                messageData: [
                    {
                        name: '持有人',
                        system: '操作系统',
                        enrollDate: '注册日期',
                        appName: '应用名称',
                        count: '安装次数',
                        version: '版本号'
                    }
                ]
            }
        },
        components: {
            'my-list': list
        }
    }
</script>

<style scoped lang='less'>
    .register {
        margin: 0 20px 10px 20px;
        .left,.right {
            height: 320px;
        }
    }
</style>