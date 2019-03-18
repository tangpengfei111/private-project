<template>
   <el-container>
       <el-aside width='210px'>
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                background-color="#F0F6F6"
                text-color="#3C3F41"
                active-text-color="black">
                <el-scrollbar style='height:100%'>
                    <my-foldMenu :foldMenus="leftMenus"></my-foldMenu>
                </el-scrollbar>
            </el-menu>
       </el-aside>
       <el-container>
           <el-header>
               <my-userSearch til='management' :itemData='selectData' @changeFlag='isFlag' ></my-userSearch>
           </el-header>
           <el-main>
               <my-table til='management' @select="isSelect" :flag='flag'></my-table>
           </el-main>
       </el-container>
   </el-container>
</template>

<script>
    import foldMenu from './foldMenu.vue'
    import userSearch from './userSearch.vue'
    import table from './table.vue'
    export default {
        data() {
            return {
                selectData: {},
                flag:false
            }
        },
		components:{
            'my-foldMenu': foldMenu,
            'my-userSearch': userSearch,
            'my-table': table,
		},
		created(){
			// console.log('数据信息')
		},
		methods:{
			menuSelected(index,indexPath){
				// console.log('当前绑定的index值',index)
				// console.log('当前绑定的index与path值',indexPath)
            },
            isSelect(obj) {
                this.selectData = obj;
                this.flag = false;
            },
            isFlag() {
                this.flag = true;
            }
        },
        computed: {
            leftMenus() {
                return this.$store.state.userMenusList;
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
        line-height: 40px;
        padding: 10px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: left;
        line-height: 100px;
    }
    .el-menu {
        height: 490px;
        width: 200px;
    }
</style>
