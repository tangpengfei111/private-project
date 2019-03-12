<template>
  <div>
    <el-table
      ref='multipleTable'
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column v-if="managementFlag" prop="name" label="姓名" width="160" align="center"></el-table-column>
      <el-table-column v-if="managementFlag" prop="phone" label="电话" width="180" align="center"></el-table-column>
      <el-table-column v-if="managementFlag" prop="department" label="部门" width="160" align="center"></el-table-column>
      <el-table-column v-if="managementFlag" prop="state" label="状态" align="center"></el-table-column>
      <el-table-column v-if="groupFlag" prop="name" label="用户组" width="250" align="center"></el-table-column>
      <el-table-column v-if="groupFlag" prop="desc" label="用户组描述" align="center"></el-table-column>
      <el-table-column v-if="departmentFlag" prop="code" label="部门代码" width="220" align="center"></el-table-column>
      <el-table-column
        v-if="departmentFlag"
        prop="name"
        label="部门名称"
        width="250"
        align="center"
      ></el-table-column>
      <el-table-column v-if="departmentFlag" prop="desc" label="部门描述" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button v-if="managementFlag" type="primary" size="small">详情</el-button>
          <el-button v-if="!managementFlag" @click="editor(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button v-if="!managementFlag" @click='del(scope.row)' type="danger" size="small">删除</el-button>
        </template>
        <div>{{flag}}</div>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        :total="total"
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  props: ["til",'flag'],
  data() {
    return {
      pagesize:5,
      currentPage:1,
      managementFlag: false,
      groupFlag: false,
      departmentFlag: false
    };
  },
  created() {
    this.isShow();
    this.$store.dispatch("getUserList");
  },
  mounted() {
    if (this.flag == true) {
      this.$refs.multipleTable.clearSelection()
      this.flag = false;
    }
  },
  computed: {
    tableData() {
      if (this.til === "management") {
        return this.$store.state.userMessage;
      } else if (this.til === "group") {
        return this.$store.state.userGroup;
      } else if (this.til === "department") {
        return this.$store.state.departmentList;
      }
    },
    total() {
      if (this.til === "management") {
        return this.$store.state.userMessage.length+1;
      } else if (this.til === "group") {
        return this.$store.state.userGroup.length+1;
      } else if (this.til === "department") {
        return this.$store.state.departmentList.length+1;
      }
    }
  },
  methods: {
    isShow() {
      if (this.til === "management") {
        this.managementFlag = true;
      } else if (this.til === "group") {
        this.groupFlag = true;
      } else if (this.til === "department") {
        this.departmentFlag = true;
      }
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSelectionChange(items) {
      this.$emit('select',items);
    },
    editor(row) {
      if(row.code) {
        this.$store.commit('userDepartmentVisibleIsShow');
      }else {
        this.$store.commit('userGroupVisibleIsShow');
      }
      this.$emit('change',row);
      // 用户分组，部门分类父组件传当前编辑的元素
    },
    del(row) {
      if(row.code) {
        this.$store.dispatch('delDepartment',row)
      }else {
        this.$store.dispatch('delUserGroup',row)
      }
    }
  }
};
</script>

<style scoped>
</style>