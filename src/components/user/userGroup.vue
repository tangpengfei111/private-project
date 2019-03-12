<template>
    <el-container>
        <el-header>
            <my-userSearch til='group' :formData='form' :itemData='selectData'></my-userSearch>
        </el-header>
        <el-main>
            <my-table til='group' @change='fn' @select="isSelect"></my-table>
        </el-main>
    </el-container>
</template>

<script>
    import userSearch from './userSearch.vue'
    import table from './table.vue'
    export default {
        data() {
            return {
                form: {
                    name:"",
                    code:"",
                    desc:"",
                    higherCode:""
                },
                selectData: {}
            }
        },
        components: {
            'my-userSearch':userSearch,
            'my-table': table
        },
        methods: {
            fn(obj) {
                for(let k in obj) {
                    this.form[k] = obj[k]
                }
            },
            isSelect(obj) {
                this.selectData = obj;
            }
        }
    }
</script>

<style scoped>
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
        line-height: 50px;
    }
</style>