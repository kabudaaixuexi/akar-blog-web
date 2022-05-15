
const importModule = import.meta.glob('../modules/**/*.vue')
const Layout = () => import('@/components/Layout/index.vue')
const LayoutView = () => import('@/components/Layout/LayoutView.vue')
const LayoutArea = () => import('@/components/Layout/LayoutArea.vue')

const childrenRoutes = [
  {
    path: '/test-layout',
    title: 'TestLayout',
    name: '布局测试',
    icon: 'el-icon-s-promotion',
    meta: {
      title: 'TestLayout'
    },
    component: LayoutArea
  },
  {
    path: '/test',
    title: 'Test',
    name: '测试',
    icon: 'el-icon-s-promotion',
    meta: {
      title: 'Test'
    },
    component: importModule['../modules/test.vue']
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    icon: 'eye',
    meta: {
      title: '账户'
    },
    redirect: {
      name: 'UserLogin'
    },
    children: [
      {
        path: 'login',
        name: 'UserLogin',
        component: importModule['../modules/Account/pages/login.vue'],
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    name: 'Project',
    icon: 'eye',
    redirect: {
      name: 'ProjectList'
    },
    children: [
      {
        path: 'list',
        name: 'ProjectList',
        component: importModule['../modules/Project/pages/list.vue'],
        meta: {
          title: '内容中心'
        }
      }
    ]
  },
  {
    path: '/common',
    component: Layout,
    name: 'Common',
    icon: 'eye',
    redirect: {
      name: 'CommonList'
    },
    children: [
      {
        path: 'list',
        name: 'CommonList',
        component: importModule['../modules/Common/pages/list.vue'],
        meta: {
          title: '社区文章'
        }
      }
    ]
  },
  {
    path: '/result',
    redirect: {
      name: 'ProjectList'
    }
  },
  {
    path: '/result/:noteId',
    component: LayoutView,
    name: 'result',
    icon: 'eye',
    redirect: {
      name: 'ResultOverview'
    },
    children: [
      {
        path: 'overview',
        name: 'ResultOverview',
        component: importModule['../modules/Result/pages/overview.vue'],
        meta: {
          title: '总览'
        }
      }
    ]
  }
]

export default childrenRoutes
