<template>
    <div class="distribute">
        <el-row :gutter="28">
            <el-col :span="8">
                <div class="left">
                    <my-chart til='设备所有权分布' :ownershipData='ownership'></my-chart>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="middle">
                    <my-chart til='运营商分布' :operatorData='operator'></my-chart>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="right">
                    <my-chart til='操作系统版本分布' :systemStateData='systemState'></my-chart>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import chart from '@/components/home/chart.vue'
    export default {
        data() {
            return {
                ownership: [
                    {
                        name:'个人设备',
                        value: 9
                    },
                    {
                        name:'单位设备',
                        value: 1
                    }
                ],
                operator: [
                    {
                        name:'中国电信',
                        value: 9,
                        itemStyle: {
                            color: '#61a0a8'
                        }
                    },
                    {
                        name:'其他',
                        value: 1,
                        itemStyle: {
                            color: '#d48265'
                        }
                    }
                ],
                systemState: [
                    {
                        name:'Android 4.3',
                        value: 6,
                        itemStyle: {
                            color: '#61a0a8'
                        }
                    },
                    {
                        name:'Android 5.1.1',
                        value: 2,
                        itemStyle: {
                            color: '#d48265'
                        }
                    },
                    {
                        name:'Android 6.2',
                        value: 2,
                    }
                ]
            }
        },
        components: {
            'my-chart': chart,
        }
    }
</script>

<style scoped lang='less'>
    .distribute {
        margin: 0 20px 20px 20px;
    }
</style>