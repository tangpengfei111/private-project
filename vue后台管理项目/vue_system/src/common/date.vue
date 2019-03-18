<template>
    <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
        v-model="value"
        type="datetime"
        placeholder="选择日期时间">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:""
            }
        }
    }
</script>

<style scoped>

</style>