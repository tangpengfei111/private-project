<template>
    <el-main>
        <el-form class="box" ref="form"  label-width="80px" size="mini">
            <el-form-item label="持有人">
            <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
            <el-select v-model="cellphoneModel" placeholder="请选择设备型号">
                <el-option label="HUAWEI Honor 10" value="HUAWEI Honor 10"></el-option>
                <el-option label="HUAWEI Mate 20" value="HUAWEI Mate 20"></el-option>
                <el-option label="Hisense A6" value="Hisense A6"></el-option>
                <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="操作系统">
            <el-select v-model="systemVersion" placeholder="请选择操作系统">
                <el-option label="Android 6.2" value="Android 6.2"></el-option>
                <el-option label="Android 9" value="Android 9"></el-option>
                <el-option label="EMUI8.1" value="EMUI8.1"></el-option>
                <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="注册日期">
                <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format='yyyy-MM-dd'
                v-model="enrollDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="运营商">
            <el-select v-model="operator" placeholder="请选择运营商">
                <el-option label="中国电信" value="中国电信"></el-option>
                <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="所有权">
            <el-select v-model="ownership" placeholder="请选择设备所有权">
                <el-option label="个人设备" value="个人设备"></el-option>
                <el-option label="单位设备" value="单位设备"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="状态">
            <el-radio-group v-model="state" size="medium">
                <el-radio border label="激活"></el-radio>
                <el-radio border label="未激活"></el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即添加</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
export default {
  data() {
    return {
        name: "",
        cellphoneModel: "",
        systemVersion: "",
        enrollDate: "",
        operator:"",
        ownership:'',
        state:''
    };
  },
  created() {
      let obj = this.$route.query;
      this.name = obj.name;
      this.cellphoneModel = obj.cellphoneModel;
      this.systemVersion = obj.systemVersion;
      this.enrollDate = obj.enrollDate;
      this.operator = obj.operator;
      this.ownership = obj.ownership;
      this.state = obj.state;
  },
  methods: {
    onSubmit() {
        let obj = {
            name: this.name,
            cellphoneModel: this.cellphoneModel,
            systemVersion: this.systemVersion,
            enrollDate: this.enrollDate,
            operator:this.operator,
            ownership:this. ownership,
            state:this.state
        }
        let p = this.$store.dispatch('addCellphone',obj);
        p.then((data) => {
            if (data.data == 'success') {
                this.$router.push('/management')
            }
        })
    }
  }
};
</script>

<style scoped lang='less'>
    .box {
        background-color: #e9eef3;
        color: #333;
        padding: 50px 60px;
        position: absolute;
        left: 40%;
        .el-input {
            width: 193px;
        }
    }
</style>