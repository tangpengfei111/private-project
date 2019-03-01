<template>
    <div class='chart'>
        <div class="til">{{til}}</div>
        <div class='chartMain'>
            <div class='pieChart' :id='digname'></div>
        </div>
    </div>
</template>

<script>
    const echarts = require('echarts');
    export default {
        props:['til','cellphoneStateData','ownershipData','operatorData','systemStateData'],
        data() {
            return {
                digname: 'my'+ Math.random()
            }
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById(this.digname),null, {renderer: 'svg'});
            let arr = this.ownershipData || this.operatorData || this.systemStateData || this.cellphoneStateData;
            this.initData(arr,this.til);
        },
        methods: {
            initData(ary,til) {
                const option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ary
                    },
                    series : [
                        {
                            name: til,
                            type: 'pie',
                            radius : '60%',
                            center: ['55%', '55%'],
                            data: ary,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        }
    }
</script>

<style scoped lang='less'> 
    .chart {
        width: 388px;
        height: 290px;
        background: #fff;
        padding: 15px;  
        .til {
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid #ebeef5;
            font-size: 16px;
            color: rgb(26, 25, 25);
            font-weight: 600;
        }
        .chartMain {
            width: 380px;
            height: 250px;
            .pieChart {
                width: 380px;
                height: 250px;
            }
        }
    }
</style>