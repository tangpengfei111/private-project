<template>
    <div class='index'>
        <div class="nav">
            <router-link to='/home'>
                <div class='iconfont icon-zhuye'>
                    <span>仪表板</span>
                </div>
            </router-link>
            <router-link to='/cellphoneManagement'>
                <div class='iconfont icon-shouji'>
                    <span>设备管理</span>
                </div>
            </router-link>
            <router-link to='/userManagement'>
                <div class='iconfont icon-Userpersonavtar'>
                    <span>用户管理</span>
                </div>
            </router-link>
            <!-- <router-link to='/applicationList'>
                <div class='iconfont icon-application'>
                    <span>应用管理</span>
                </div>
            </router-link>
            <router-link to='/strategyList'>
                <div class='iconfont icon-strategy'>
                    <span>策略管理</span>
                </div>
            </router-link> -->
            <router-link to='/newInformation'>
                <div class='iconfont icon-Push'>
                    <span>推送管理</span>
                </div>
            </router-link>
            <router-link to='/set'>
                <div class='iconfont icon-set'>
                    <span>设置</span>
                </div>
            </router-link>
            <div class="admin">
                <el-button @click='exit' >
                    <div class="iconfont icon-tuichu">
                         <span>退出</span>
                    </div>
                </el-button>
            </div>
        </div>
        <div class="conent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        methods: {
            exit() {
                let token = {token:sessionStorage.getItem('token')};
                let p = this.$store.dispatch('exit',token);
                p.then((data) => {
                    if (data.data.status == 220) {
                        this.$message({
							type: 'success',
							message: data.data.msg
                        });
                        this.$router.push('login');
                        sessionStorage.removeItem('token')
                    }
                })
            }
        }
    }
</script>

<style scoped lang='less'>
    .nav {
        width: 100%;
        min-width: 1000px;
        height: 80px;
        line-height: 80px;
        background: #fff;
        position: relative;
        overflow: hidden;
        &>a {
            text-decoration: none;
            color: black;
            div {
                margin-left:70px;
                float: left;
                font-size: 18px;
                &:nth-child(1) {
                    position: relative;
                    left: 15%;  
                }    
            }
        }
        &>a.current {
            color: rgb(72, 19, 218);
        }
        .admin {
            position: absolute;
            top: 10px;
            right: 20px;
            .el-button {
                width: 80px;
                margin-left:30px;
                font-size: 16px;
                padding: 10px;
            }
            
        }
    }
    
    .conent {
        border:0.1px solid #fff;
        width: 100%;
        height: 100%;
        background: rgba(177, 180, 180, 0.925);        
    }
            
</style>