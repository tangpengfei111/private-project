<template>
    <div class='box'>
        <el-button v-if='managementFlag' type="primary" size="small" @click='addUser'>添加用户</el-button>
        <el-button v-if='managementFlag' type="primary" size="small" @click='relevance'>关联部门</el-button>
        <el-button v-if='groupFlag' type="primary" size="small" @click='userGroupIsShow'>添加用户组</el-button>
        <el-button v-if='departmentFlag' type="primary" size="small" @click='departmentIsShow'>添加部门</el-button>
        <el-button v-if='departmentFlag || groupFlag' type="danger" size="small" @click='delAll'>删除已选</el-button>


        <el-dialog title="关联部门" :visible="relevanceVisible" :show-close='false' width='35%' top='10vh'>
            <div class="myMenuBox">
                <el-menu
                    default-active="0"
                    background-color="#F0F6F6"
                    text-color="#3C3F41"
                    active-text-color="black">  
                    <el-scrollbar style='height:100%'>
                        <my-foldMenu :foldMenus="leftMenus" @add="addItem" til='userSearch'></my-foldMenu>
                    </el-scrollbar>
                </el-menu>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelRelevanceSub">取 消</el-button>
                <el-button type="primary" @click="relevanceSub">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="添加部门" :visible="departmentVisible" :show-close='false' width='30%' top='10vh'>
      <el-form :model="form" size='mini'>
        <el-form-item label="部门代码" label-width="100">
          <el-input v-model.number="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" label-width="100">
         <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门代码" label-width="100">
         <el-input v-model.number="form.higherCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" label-width="100">
         <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="departmentIsShow">取 消</el-button>
        <el-button type="primary" @click="ensureAddDepartment">确 定</el-button>
      </div>
    </el-dialog>


        <el-dialog title="添加用户组" :visible="groupVisible" :show-close='false' width='30%'>
        <el-form :model="form">
            <el-form-item label="用户组" label-width="120">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组描述" label-width="120">
            <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="userGroupIsShow">取 消</el-button>
            <el-button type="primary" @click="ensureAddUserGroup">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
    import foldMenu from './foldMenu.vue'
    export default {
        props:['til','formData','itemData'],
        data() {
            return {
                managementFlag:false,
                groupFlag:false,
                departmentFlag:false,
                relevanceVisible:false,
                form: {},
                rootCode:'',
                selectDepartment:'',
                judeg: false
            }
        },
        components: {
            'my-foldMenu':foldMenu
        },
        created() {
            this.isShow()
        },
        mounted() {
            if(this.formData) {
                this.form = this.formData;
            }
        },
        computed: {
            groupVisible() {
                return this.$store.state.userGroupVisible;
            },
            departmentVisible() {
                return this.$store.state.userDepartmentVisible;
            },
            leftMenus() {
                return this.$store.state.userMenusList;
            }
        },
        methods: {
            isShow() {
                if(this.til === 'management') {
                    this.managementFlag = true;
                }else if(this.til === 'group') {
                    this.groupFlag = true;
                }else if(this.til === 'department') {
                    this.departmentFlag = true;
                }
            },
            addUser() {

            },
            relevance() {
                this.relevanceVisible = true;
            },
            addItem(item) {
                let ele = document.getElementsByClassName('menu_current')[0];
                this.selectDepartment = ele ? ele.innerText : null;
                this.rootCode = item.entity.code;
            },
            relevanceSub() {
                let ele = document.getElementsByClassName('menu_current')[0];
                    if (ele) {
                        ele.className = 'default';   
                    }
                this.relevanceVisible = false;
                this.$emit('changeFlag');
                if (this.selectDepartment && this.itemData.length > 0) {
                    let ary = this.itemData.map(item => {
                        return item.id
                    })
                    let obj = {
                        "rootCode":this.rootCode,
                        "selectDepartment":this.selectDepartment,
                        "itemData":ary
                    };
                    this.$store.dispatch('relevanceDepartment',obj);
                }
            },
            cancelRelevanceSub() {
                let ele = document.getElementsByClassName('menu_current')[0];
                if (ele) {
                    ele.className = 'default';
                }
                this.relevanceVisible = false;
                this.$emit('changeFlag');
            },
            delAll() {
                
            },
            userGroupIsShow() {
                this.$store.commit('userGroupVisibleIsShow');
                if(this.form != {}) {
                    for(let k in this.form) {
                        this.form[k] = '';
                    }
                }
            },
            departmentIsShow() {
                this.$store.commit('userDepartmentVisibleIsShow');
                if(this.form != {}) {
                    for(let k in this.form) {
                        this.form[k] = '';
                    }
                }
                this.judeg = true;
            },
            ensureAddUserGroup() {
                let obj = {
                    name: this.form.name,
                    desc: this.form.desc,
                    id: this.form.id
                }
                if (obj.name && obj.desc) {
                    this.$store.dispatch('addUserGroup',obj);
                }
                this.$store.commit('userGroupVisibleIsShow');
            },
            ensureAddDepartment() {
                let obj = {
                    name: this.form.name,
                    code: this.form.code,
                    desc:this.form.desc,
                    higherCode: this.form.higherCode
                }
                this.$store.commit('userDepartmentVisibleIsShow');
                if (this.judeg) {
                    this.$store.dispatch('addDepartment',obj);
                    this.judeg = false;
                    return;
                }
                if (obj.code && obj.name && obj.desc) {
                    this.$store.dispatch('changeDepartment',obj);
                    // 重复code 由 后端进行对比
                }
                
            }
        }
    }
</script>

<style scoped lang='less'>
    .box {
        text-align: left;
    }
    .el-dialog {
        padding: 10px;
    }
    .dia_box {
        height: 300px;
        .el-form-item__body {
            height: 250px;
        }
    }
    .myMenuBox {
        overflow: hidden;
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: 1px solid rgb(7, 212, 219);
        border-radius: 10px;
        .el-menu {
            height: 100%;
            width: 100%;
        }
    }
   
</style>