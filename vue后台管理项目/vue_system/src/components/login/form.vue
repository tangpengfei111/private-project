<template>
    <el-dialog title="添加管理员" :visible="addGroupVisible" width='35%' :show-close="false" top='17vh'>
        <el-form :model=" formData">
        <el-form-item label="用户名">
            <el-input v-model=" formData.username" autocomplete="off" class='inp'></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model=" formData.password" autocomplete="off" height='200'></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input type="password" v-model=" formData.password1" autocomplete="off" height='200'></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addGroupVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensure">确定注册</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                addGroupVisible: true,
                formData:{
                    username:'',
                    password:'',
                    password1:''
                }
            }
        },
        methods: {
            ensure() {
                if (this.formData.password && this.formData.password1 && this.formData.username) {
                    if (this.formData.username.length < 6 || this.formData.password.length < 6) {
                        this.$notify.error({
                            title: '错误',
                            message: '用户名、密码字符长度最少设置6位',
                            offset: 100
                        });
                        return;
                    }
                    if (this.formData.password !== this.formData.password1) {
                        this.$notify.error({
                            title: '密码设置错误',
                            message: '两次密码输入不一致',
                            offset: 100
                        });
                        return;
                    }
                    this.$store.dispatch('register',this.formData)
                    this.addGroupVisible = false;
                }else {
                    this.$notify.error({
                        title: '错误',
                        message: '请输入正确的用户名密码',
                        offset: 100
                    });
                    return;
                }
               
            }
        }
    }
</script>

<style scoped>

</style>