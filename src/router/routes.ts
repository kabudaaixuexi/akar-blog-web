import routers from './child-routes'
const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/common'
  },
  ...routers,
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/components/404.vue')
  }
]

export default routes
