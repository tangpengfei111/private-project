<template>
    <div class='message'>
        <el-row :gutter="28">
            <el-col :span="3">
                <div class="left">
                    <my-statistical :total='total'></my-statistical>
                </div>
            </el-col>
            <el-col :span="13">
                <div class="middle">
                    <my-list til='ROOT设备' :listdata='messageData'></my-list>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="right">
                    <my-chart til='设备状态分布' :cellphoneStateData='cellphoneState'></my-chart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import chart from '@/components/home/chart.vue'
    import list from '@/components/home/list.vue'
    import statistical from '@/components/home/statistical.vue'
    export default {
        data () {
            return {
                total: [
                    {
                        name:'总设备数',
                        count: 10
                    },
                    {
                        name:'总用户数',
                        count: 8
                    }
                ],
                messageData: [
                    {
                        name: '持有人',
                        system: '操作系统',
                        enrollDate: '注册日期',
                        appName: '应用名称',
                        count: '安装次数',
                        version: '版本号'
                    }
                ],
                cellphoneState: [
                    {
                        name:'激活',
                        value: 8,
                        itemStyle: {
                            color: '#61a0a8'
                        }
                    },
                    {
                        name:'未激活',
                        value: 2,
                        itemStyle: {
                            color: '#d48265'
                        }
                    }
                ]
            }
        },
        components: {
            'my-chart': chart,
            'my-list': list,
            'my-statistical': statistical,
        }
    }
</script>

<style scoped lang='less'>
    .message {
        overflow: hidden;
        // border: 1px solid blue;
        margin: 20px 20px;
        .middle {
            height: 320px;
        }
    }
</style>