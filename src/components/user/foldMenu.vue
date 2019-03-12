<template>
  <div class="foldMenu">
    <label v-for="(foldMenu,index) in foldMenus" :key='index'  @click="add(foldMenu)" >
    	<!--只有一级菜单-->
      <el-menu-item v-if="foldMenu.childs==null&&foldMenu.entity&&foldMenu.entity.state==='ENABLE'"
                    :key="foldMenu.entity.code" :data="foldMenu" :index="foldMenu.entity.name" 
                   
                    >
          <!-- :route="foldMenu.entity.value" -->
          <!--图标-->
        <!-- <i :class="foldMenu.entity.icon"></i> -->
        <!--标题-->
        <div class='default' @click='select($event,foldMenu)'>
          <span slot="title">{{foldMenu.entity.name}}</span>
        </div>
        
      </el-menu-item>
      <!--有多级菜单-->
      <el-submenu v-if="foldMenu.childs&&foldMenu.entity&&foldMenu.entity.state==='ENABLE'"
                  :key="foldMenu.entity.code" 
                  :data="foldMenu" 
                  :index="foldMenu.entity.name">
        <template slot="title">
          <!-- <i :class="foldMenu.entity.icon"></i> -->
          <span> {{foldMenu.entity.name}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <my-foldMenu :foldMenus="foldMenu.childs" :til='til'></my-foldMenu>
      </el-submenu>
    </label>
  </div>
</template>
 
<script>
  export default {
    name: 'my-foldMenu', //使用递归组件必须要有
    props: ['foldMenus','til'], // 传入子组件的数据
    data() {
      return {}
    },
    created() {
      if(!this.til) {
        this.select = function() {};
      }
    },
    methods: {
      add(item) {
        this.$emit('add',item)
      },
      select(e,item) {
        if (e.target.className == 'menu_current') {
          e.target.className = 'default';
        }else {
          let ary = document.getElementsByClassName('menu_current');
          if (ary.length == 1) return;
          e.target.className = 'menu_current';
        }
      }
    }
  }
</script>
 
<style scoped lang='less'>
  .el-menu-item {
    height: 30px;
    line-height: 30px;
  }
  .foldMenu {
    width: 100%;
    height: 100%;
  }
  .menu_current {
    background: rgb(88, 60, 245)
  }
</style>