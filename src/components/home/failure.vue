<template>
    <div class='failure'>
        <my-biglist :tableData='failuerMessage'></my-biglist>
    </div>
</template>

<script>
    import biglist from './biglist.vue'
    export default {
        data() {
            return {
                failuerMessage: null
            }
        },
        components: {
            'my-biglist': biglist  
        }
    }
</script>

<style scoped lang='less'>
    .failure {
        width: 97%;
        height: 300px;
        margin-left: 20px;
        background: #fff;
        margin-bottom: 20px;
    }
    
</style>