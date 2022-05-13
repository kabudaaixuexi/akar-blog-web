import router from '@/router'
import Store from '@/store'
import { sleep } from '@/utils/request'
import Cookie from 'js-cookie'

import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
})
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('😄😄😄 ', to, from)
  next()
})

router.afterEach((to) => {
  NProgress.done()
})
