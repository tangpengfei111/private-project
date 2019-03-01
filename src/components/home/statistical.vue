<template>
    <div class='total'>
        <div v-for='(item,index) in total' :key='index'>
            <br><span>{{item.count}}</span>
            <br>{{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        props:['total']
    }
</script>

<style scoped lang='less'>
    .total {
        div {
            min-width:100px;
            height: 150px;
            text-align: center;
            background: #fff;
            font-size: 18px;
            span {
                font-size: 50px;
            }
        }
        div:nth-child(1) {
            color: rgb(21, 165, 231);
        }
        div:nth-child(2) {
            color: rgb(236, 43, 29);
            margin-top: 20px;
        }
    }
</style>