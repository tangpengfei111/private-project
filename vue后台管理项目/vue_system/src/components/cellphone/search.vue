<template>
  <div class="box">
    <el-button v-if="!flag" type="primary" size="small">设备分组</el-button>
    <el-button v-if="flag" type="primary" size="small" @click='callout'>添加分组</el-button>
    <el-button v-if="flag" type="danger" size="small" @click="delGroupVisible = true">删除已选</el-button>
    <el-button v-if="!flag" type="primary" size="small" @click='addCellphone'>添加设备</el-button>
    <el-button v-if="!flag" type="primary" size="small">批量导入</el-button>
    <el-button v-if="!flag" type="primary" size="small">数据导出</el-button>

    
    <!-- 设备分组- 删除已选按钮 -->
    <el-dialog title="删除提示" :visible="delGroupVisible" width="30%" :show-close="false" top='30vh'>
      <div class="line">您确定要删除选中的设备组吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delGroupVisible = false">取 消</el-button>
        <el-button type="danger" @click="delGroup">确定删除</el-button>
      </span>
    </el-dialog>

    <!-- 设备分组- 添加分组 按钮-->
    <el-dialog title="添加分组" :visible="addGroupVisible" width='35%' :show-close="false" top='17vh'>
        <el-form :model="groupData">
        <el-form-item label="设备分组">
            <el-input v-model="groupData.name" autocomplete="off" class='inp'></el-input>
        </el-form-item>
        <el-form-item label="设备组描述">
            <el-input v-model="groupData.describe" autocomplete="off" height='200'></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addGroupVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGroup">确定添加</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['til'], // til 值 group  management  控制显示情况
  data() {
    return {
      flag: false,
      delGroupVisible: false,
      addGroupVisible: false,
      groupData: {
          name:'',
          describe:''
      }
    };
  },
  methods: {
    isShow() {
      if (this.til == "group") {
        this.flag = true;
      } else if (this.til == "management") {
        this.flag = false;
      }
    },
    delGroup() {
      this.delGroupVisible = false;
      this.$store.dispatch()
    },
    addCellphone() {
      return this.$router.push('/addList');
    },
    addGroup() {
      this.addGroupVisible = false;
      console.log(this.groupData)
      if (this.groupData.name) {
        this.$store.dispatch('addCellphoneGroupData',this.groupData)
      }
    },
    callout(option) {
      this.addGroupVisible = true;
      if (option) {
        this.groupData = {
          'name': option.name,
          'describe': option.describe,
          'id': option.id
        }
      }
    }
  },
  created() {
    this.isShow();
  }
};
</script>

<style scoped lang='less'>
    .box {
        text-align: left;
        .line {
            width: 250px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid red;
            border-radius: 4px;
            color: red;
            font-size: 16px;
        }
       
    }    
</style>