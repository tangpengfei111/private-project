import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home/home.vue'
import cellphone from './components/cellphone/cellphone.vue'
import user from './components/user/user.vue'
import application from './components/application/application.vue'
import strategy from './components/strategy/strategy.vue'
import push from './components/push/push.vue'
import set from './components/set/set.vue'
import admin from './components/admin/admin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('./components/index.vue'),
      children: [
        {
          path: '/home',
          component: home,
          meta: {
            til: '仪表板'
          }
        },
        {
          path: '/cellphone',
          redirect: '/management',
          component: cellphone,
          meta: {
            til: '设备管理'
          },
          children: [
            {
              path: '/management',
              component:() => import('./components/cellphone/management.vue'),
              meta: {
                til: '设备管理'
              }
            },
            {
              path: '/group',
              component:() => import('./components/cellphone/group.vue'),
              meta: {
                til: '设备分组'
              }
            },
            {
              path: '/addList',
              component:() => import('./components/cellphone/addList.vue'),
              meta: {
                til: '添加设备'
              }
            },
            // {
            //   path: '/gruopMessage',
            //   component:() => import('./components/cellphone/gruopMessage.vue'),
            //   meta: {
            //     til: '分组详情'
            //   }
            // }
          ]
        },
        {
          path: '/user',
          component: user,
          meta: {
            til: '用户管理'
          }
        },
        {
          path: '/application',
          component: application,
          meta: {
            til: '应用管理'
          }
        },
        {
          path: '/strategy',
          component: strategy,
          meta: {
            til: '策略管理'
          }
        },
        {
          path: '/push',
          component: push,
          meta: {
            til: '推送管理'
          }
        },
        {
          path: '/set',
          component: set,
          meta: {
            til: '设置'
          }
        },
        {
          path: '/admin',
          component: admin,
          meta: {
            til: '管理员'
          }
        },
      ]
    },
    {
      path: '/*',
      redirect: '/home'
    }
  ]
})
