<template>
  <el-container>
    <el-main>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="title">推送详情</div>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <div class="title">推送对象</div>
        <div class="redio_box">
          <el-form-item label="分组" prop="group">
            <el-radio-group v-model="ruleForm.group" @change='fn'>
              <el-radio label="设备分组">设备</el-radio>
              <el-radio label="用户分组">用户</el-radio>
              <el-radio label="部门名称">部门</el-radio>
            </el-radio-group>
            <el-select v-model="ruleForm.groupname" placeholder="请选择">
              <el-option v-for="(item,index) in pushMessage" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="类型" prop="class">
          <el-radio-group v-model="ruleForm.class">
            <el-radio label="普通消息">普通消息</el-radio>
            <el-radio label="紧急通知">紧急通知</el-radio>
            <el-radio label="祝福信息">祝福信息</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker 
            v-model="ruleForm.time" 
            type="datetime" 
            value-format='yyyy-MM-dd HH:mm:ss' 
            placeholder="选择日期时间" 
            class='time'>
          </el-date-picker>
        </el-form-item>
        <div class="btn_box">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
        class: "",
        time: "",
        group: "",
        groupname:''
      },
      rules: {
        title: [{ required: true, message: " ", trigger: "blur" }],
        content: [{ required: true, message: " ", trigger: "change" }],
        time: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        class: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        group: [{ required: true, message: " ", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
       console.log(this.selectData)
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          let p = this.$store.dispatch('addInfromation',this.ruleForm);
          p.then((data) => {
            if (data.data === 'success') {
              this.$message({
									type: 'success',
									message: '发送成功'
                });
              this.$router.push('pushHistory')
            }else {
              this.$message({
									type: 'error',
									message: '网络错误,信息发送失败'
								});
            }
          }) 
        } else {
          this.$notify.error({
							title: '错误',
							message: '请按要求添加内容,*为必填项',
							offset: 100
					});
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fn() {
      this.$store.dispatch('getPushList',this.ruleForm.group)
      this.ruleForm.groupname = '';
    }
  },
  computed: {
    ...mapState(['pushMessage'])
  }
};
</script>

<style scoped lang='less'>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 50px;
}
.demo-ruleForm {
  margin: 0 auto;
  width: 550px;
  height: 500px;
  .title {
    text-align: left;
    font-size: 20px;
    color: rgb(207, 12, 12);
  }
  .el-input {
    width: 400px;
  }
  .el-textarea {
    width: 400px;
  }
  .el-form-item {
    width: 500px;
  }
  .redio_box {
    width: 500px;
    margin-bottom: 20px;
    .el-radio-group {
      width: 260px;
      span {
        padding: 0;
      }
    }
    .el-select {
      width: 130px;
    }
  }
  .time {
    width: 250px;
  }
}
</style>