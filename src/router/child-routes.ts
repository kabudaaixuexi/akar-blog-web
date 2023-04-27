
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
    path: '/u',
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
    path: '/kv5i',
    component: Layout,
    name: 'Project',
    icon: 'eye',
    redirect: {
      name: 'ProjectList'
    },
    children: [
      {
        path: 'l',
        name: 'ProjectList',
        component: importModule['../modules/Project/pages/list.vue'],
        meta: {
          title: '内容中心'
        }
      }
    ]
  },
  {
    path: '/k2rp',
    component: Layout,
    name: 'Common',
    icon: 'eye',
    redirect: {
      name: 'CommonList'
    },
    children: [
      {
        path: 'l',
        name: 'CommonList',
        component: importModule['../modules/Common/pages/list.vue'],
        meta: {
          title: '社区文章'
        }
      }
    ]
  },
  {
    path: '/jc4c',
    component: Layout,
    name: 'Major',
    icon: 'eye',
    redirect: {
      name: 'MajorList'
    },
    children: [
      {
        path: 'l',
        name: 'MajorList',
        component: importModule['../modules/Major/pages/list.vue'],
        meta: {
          title: '专栏'
        }
      }
    ]
  },
  // 文件存储
  {
    path: '/ef6u',
    component: Layout,
    name: 'Storage',
    icon: 'eye',
    redirect: {
      name: 'StorageIndex'
    },
    children: [
      {
        path: 'i',
        name: 'StorageIndex',
        component: importModule['../modules/Storage/pages/index.vue'],
        meta: {
          title: '文件系统'
        }
      }
    ]
  },
  // 消息中心
  {
    path: '/bu4g/:uid',
    component: Layout,
    name: 'Notice',
    icon: 'eye',
    redirect: {
      name: 'NoticeIndex'
    },
    children: [
      {
        path: 'i',
        name: 'NoticeIndex',
        component: importModule['../modules/Notice/pages/index.vue'],
        meta: {
          title: '消息中心'
        }
      }
    ]
  },
  // 内容中心编辑
  {
    path: '/lett',
    redirect: {
      name: 'ProjectList'
    }
  },
  {
    path: '/lett/:noteId',
    component: Layout,
    name: 'resultEdit',
    icon: 'eye',
    redirect: {
      name: 'EditOverview'
    },
    children: [
      {
        path: 'ov',
        name: 'EditOverview',
        component: importModule['../modules/ResultEdit/pages/overview.vue'],
        meta: {
          title: '内容中心'
        }
      }
    ]
  },
  // 社区文章详情
  {
    path: '/e98f',
    redirect: {
      name: 'CommonList'
    }
  },
  {
    path: '/e98f/:noteId',
    component: Layout,
    name: 'resultDetail',
    icon: 'eye',
    redirect: {
      name: 'DetailOverview'
    },
    children: [
      {
        path: 'ov',
        name: 'DetailOverview',
        component: importModule['../modules/ResultDetail/pages/overview.vue'],
        meta: {
          title: '加载中...'
        }
      }
    ]
  },
  // 个人主页
  {
    path: '/uf',
    redirect: {
      name: 'ProjectList'
    }
  },
  {
    path: '/uf/:uid',
    component: Layout,
    name: 'userinfo',
    icon: 'eye',
    redirect: {
      name: 'HomePage'
    },
    children: [
      {
        path: 'hp',
        name: 'HomePage',
        component: importModule['../modules/UserInfo/pages/index.vue'],
        meta: {
          title: '加载中...'
        }
      },
      {
        path: 'up',
        name: 'Update',
        component: importModule['../modules/UserInfo/pages/update.vue'],
        meta: {
          title: '加载中...'
        }
      }
    ]
  }
]

export default childrenRoutes


// 社区精选 — k2rp
// 写文章 — kv5i
// 我的文件 — ef6u
// 消息通知 — bu4g
// 社区文章详情 — e98f
// 编辑文章 — lett


// list — l
// index — I
