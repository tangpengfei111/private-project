<template>
    <el-main>
        <el-form class="box" ref="form" :model="addForm" label-width="80px" size="mini">
            <el-form-item label="持有人">
            <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
            <el-select v-model="cellphoneModel" placeholder="请选择设备型号">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="操作系统">
            <el-select v-model="systemVersion" placeholder="请选择设备型号">
                <el-option label="Android 4.3" value="shanghai"></el-option>
                <el-option label="Android 5.1.1" value="beijing"></el-option>
                <el-option label="其他" value="beijing"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="注册日期">
                <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="enrollDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="运营商">
            <el-select v-model="operator" placeholder="请选择运营商">
                <el-option label="中国电信" value="shanghai"></el-option>
                <el-option label="其他" value="beijing"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="所有权">
            <el-select v-model="ownership" placeholder="请选择设备所有权">
                <el-option label="个人设备" value="shanghai"></el-option>
                <el-option label="单位设备" value="beijing"></el-option>
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
        operator:'',
        ownership:'',
        state:''
    };
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