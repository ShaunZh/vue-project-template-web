import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'
// import BlankLayout from '@/layouts/BlankLayout'
import { routerBeforeEachFunc, routerAfterEachFunc } from './interceptor'

import home from '../views/home/index.vue'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * 
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    // noCache: true                if set true, the page will no be cached(default is false)
    // affix: true                  if set true, the tag will affix in the tags-view
    // breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    // activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    keepAlive: // 是否使用keep-alive缓存页面 
    deepth: // deepth字段主要是用于进行keep-alive处理，需要缓存的页面设置1，不需缓存的页面为0.5， 缓存页面的子页面为2
  }
 */

export const constantRoutes = [
  {
    path: '/',
    component: BasicLayout,
    meta: {
      icon: 'ic-home'
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: home,
        meta: {
          deepth: 0.5
        }
      }
    ]
  },
  {
    path: '/user',
    hidden: true,
    // component: BlankLayout,
    children: [
      {
        path: '/login',
        name: 'UserLogin',
        component: () => import(/* webpackChunkName: "login" */ '../views/user/login.vue')
      },
      {
        path: '/register',
        name: 'UserRegister',
        component: () => import(/* webpackChunkName: "register" */ '../views/user/register.vue')
      },
      {
        path: '/forgetPassword',
        name: 'UserForgetPassword',
        component: () => import(/* webpackChunkName: "forgetPassword" */ '../views/user/forgetPassword.vue')
      }
    ]
  },
  {
    path: '/list',
    component: BasicLayout,
    meta: {
      icon: 'ic-list'
    },
    children: [
      {
        path: 'index',
        name: 'List',
        meta: {
          keepAlive: true,
          deepth: 1 // deepth字段主要是用于进行keep-alive处理的
        },
        component: () => import(/* webpackChunkName:  "list" */ '../views/list/index.vue')
      },
      {
        path: 'detail',
        name: 'ListItemDetail',
        component: () => import(/* webpackChunkName: "listItemDetail" */ '../views/list/detail.vue'),
        meta: {
          deepth: 2
        }
      },
      {
        path: 'edit',
        name: 'ListItemEdit',
        component: () => import(/* webpackChunkName: "listItemEdit" */ '../views/list/edit.vue'),
        meta: {
          deepth: 2
        }
      },
      {
        path: 'create',
        name: 'ListItemCreate',
        component: () => import(/* webpackChunkName: "listItemCreate" */ '../views/list/create.vue')
      },
      {
        path: 'search',
        name: 'Search',
        hidden: true,
        meta: {
          deepth: 2
        },
        component: () => import(/* webpackChunkName: "search " */ '../views/search/index.vue')
      }
    ]
  },
  {
    path: '/form',
    name: 'FormPage',
    hidden: true,
    component: () => import(/* webpackChunkName: "form" */ '../views/form/index.vue')
  },

  {
    path: '/my',
    component: BasicLayout,
    children: [
      {
        path: 'index',
        name: 'My',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/index.vue'),
        meta: {
          deepth: 0.5
        }
      }
    ]
  },
  {
    path: '/admin',
    component: BasicLayout,
    meta: {
      icon: 'ic-admin'
    },
    children: [
      {
        path: 'dataAnalysis',
        name: 'Echarts',
        meta: {
          roles: ['admin'],
          deepth: 0.5
        },
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/echarts.vue')
      }
    ]
  }
]

export const asyncRoutes = []

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // 当切换新路由时，页面滚动到顶部
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach(routerBeforeEachFunc)
router.afterEach(routerAfterEachFunc)

export default router
