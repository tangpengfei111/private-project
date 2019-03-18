<template>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item v-for='(item,i) in ary' :key='i' :index='item.index'>
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <!-- <el-menu-item index="group">
        <i class="el-icon-document"></i>
        <span slot="title">设备分组</span>
      </el-menu-item> -->
      <!-- 添加设备 路由 从 设备管理 添加设备按钮点击跳转 -->
      <!-- 分组信息 路由 从 设备分组 编辑按钮跳转 -->
    </el-menu>
</template>

<script>
    export default {
        props:['til'],
        data() {
            return {
                ary: []
            }
        },
        created() {
            this.aryData();
        },
        computed: {
            defaultActive() {
                return this.$route.path.replace('/','')
            }
        },
        methods: {
            aryData() {
                if (this.til === 'cellphone') {
                    this.ary = [
                        {
                            index:'cellphoneManagement',
                            title: '设备管理'
                        },
                        {
                            index:'cellphoneGroup',
                            title: '设备分组'
                        }
                    ]
                }else if (this.til === 'user') {
                    this.ary = [
                        {
                            index:'userManagement',
                            title: '用户管理'
                        },
                        {
                            index:'userGroup',
                            title: '用户分组'
                        },
                         {
                            index:'department',
                            title: '部门分类'
                        }
                    ]
                }else if (this.til === 'strategy') {
                    this.ary = [
                        {
                            index:'strategyList',
                            title: '策略列表'
                        },
                        {
                            index:'defaultStrategy',
                            title: '默认策略'
                        }
                    ]
                }else if (this.til === 'application') {
                    this.ary = [
                        {
                            index:'applicationList',
                            title: '应用列表'
                        },
                        {
                            index:'applicationClass',
                            title: '应用列表'
                        }
                    ]
                }else if (this.til === 'push') {
                    this.ary = [
                        {
                            index:'newInformation',
                            title: '新建推送'
                        },
                        {
                            index:'pushHistory',
                            title: '推送历史'
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo {
        height: 540px;
    }
</style>