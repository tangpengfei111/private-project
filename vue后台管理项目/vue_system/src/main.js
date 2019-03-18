import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import('./assets/common.css')


Vue.config.productionTip = false;
Vue.use(ElementUI);


router.beforeEach((to,from,next) => {
  NProgress.start(); // 开启Progress
  if(localStorage.getItem('token') || to.path == '/404'){
    document.title = `MDM管理平台 | ${to.meta.til}`;
    next();
  }else{
    if(to.path ==="/login") {
      document.title = `MDM管理平台 | ${to.meta.til}`;
      next()
    }else {
      document.title = `MDM管理平台 | 登录`;
      next('/login')
    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});
  


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
