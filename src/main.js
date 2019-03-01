import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store/store.js';

import('./assets/common.css')

Vue.config.productionTip = false;
Vue.use(ElementUI);


router.beforeEach((to,from,next) => {
  document.title = `MDM管理平台 | ${to.meta.til}`;
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
