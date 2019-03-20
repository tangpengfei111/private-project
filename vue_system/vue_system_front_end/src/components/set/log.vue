<template>
  <el-main>
    <el-table
      :data="logList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      height="450" 
      highlight-current-row='true'
    >
      <el-table-column prop="user_name" label="管理员帐户" align="center"></el-table-column>
      <el-table-column prop="date" label="日期" align="center"></el-table-column>
      <el-table-column prop="url" label="动作" align="center"></el-table-column>
    </el-table>
    <div class="pag">
      <el-pagination
        background
        :total="total"
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </el-main>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pagesize: 8,
      currentPage: 1
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(["logList"]),
    total() {
      return this.logList.length + 1;
    }
  },
  methods: {
    getList(str) {
      if (!str) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let date = new Date().getDate();
        month = month + 1 > 9 ? month + 1 : `0${month + 1}`;
        date = date > 9 ? date : "0" + date;
        str = `${year}${month}${date}`;
      }
      this.$store.dispatch("getLogList", str);
    },
    currentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>


<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
 .pag {
        text-align: center;
        margin-top: 20px;
    }
</style>