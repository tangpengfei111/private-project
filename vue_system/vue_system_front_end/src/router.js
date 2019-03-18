import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/components/home/home')), 'home');
const cellphone = r => require.ensure([], () => r(require('@/components/cellphone/cellphone')), 'cellphone');
const user = r => require.ensure([], () => r(require('@/components/user/user')), 'user');
const application = r => require.ensure([], ()=> r(require('@/components/application/application')), 'application');
const strategy = r => require.ensure([], () => r(require('@/components/strategy/strategy')), 'strategy');
const push = r => require.ensure([], () => r(require('@/components/push/push')), 'push');
const set = r => require.ensure([], () => r(require('@/components/set/set')), 'set');
const admin = r => require.ensure([], () => r(require('@/components/admin/admin')), 'admin');
const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login');
const noFind = r => require.ensure([], () => r(require('@/components/login/noFind')), 'noFind');

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/index',
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
        redirect: '/cellphoneManagement',
        component: cellphone,
        meta: {
          til: '设备管理'
        },
        children: [
          {
            path: '/cellphoneManagement',
            component:() => import('./components/cellphone/cellphoneManagement.vue'),
            meta: {
              til: '设备管理'
            }
          },
          {
            path: '/cellphoneGroup',
            component:() => import('./components/cellphone/cellphoneGroup.vue'),
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
          }
        ]
      },
      {
        path: '/user',
        component: user,
        redirect: '/userManagement',
        meta: {
          til: '用户管理'
        },
        children: [
          {
            path: '/userManagement',
            component:() => import('./components/user/userManagement.vue'),
            meta: {
              til: '用户管理'
            }
          },
          {
            path: '/userGroup',
            component:() => import('./components/user/userGroup.vue'),
            meta: {
              til: '用户分组'
            }
          },
          {
            path: '/department',
            component:() => import('./components/user/department.vue'),
            meta: {
              til: '部门分类'
            }
          }
        ]
      },
      {
        path: '/application',
        redirect: '/applicationList',
        component: application,
        meta: {
          til: '应用管理'
        },
        children: [
          {
            path: '/applicationList',
            component:() => import('./components/application/applicationList.vue'),
            meta: {
              til: '应用列表'
            }
          },
          {
            path: '/applicationClass',
            component:() => import('./components/application/applicationClass.vue'),
            meta: {
              til: '应用分类'
            }
          }
        ]
      },
      {
        path: '/strategy',
        redirect: '/strategyList',
        component: strategy,
        meta: {
          til: '策略管理'
        },
        children: [
          {
            path: '/strategyList',
            component:() => import('./components/strategy/strategyList.vue'),
            meta: {
              til: '策略列表'
            }
          },
          {
            path: '/defaultStrategy',
            component:() => import('./components/strategy/defaultStrategy.vue'),
            meta: {
              til: '默认策略'
            }
          }
        ]
      },
      {
        path: '/push',
        redirect: '/newInformation',
        component: push,
        meta: {
          til: '推送管理'
        },
        children: [
          {
            path: '/newInformation',
            component:() => import('./components/push/newInformation.vue'),
            meta: {
              til: '新建推送'
            }
          },
          {
            path: '/pushHistory',
            component:() => import('./components/push/pushHistory.vue'),
            meta: {
              til: '推送历史'
            }
          }
        ]
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
    path: '/login',
    component:login,
    meta: {
      til: '登录'
    }
  },
  {
    path:'/404',
    component:noFind,
    meta: {
      til: '404'
    }
  },
  {
    path:'/*',
    redirect: '/404'
  }
]



export default new Router({
  mode: 'hash',
  linkActiveClass: 'current',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
