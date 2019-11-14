import Vue from 'vue';
import Router from 'vue-router';
import movieIndex from './AllRouter/index';
import movieShop from './AllRouter/shopcart';
import movieYing from './AllRouter/movieho';
import movieWode from './AllRouter/mycon';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  bash: process.env.BASH_URL,
  routes: [
    movieIndex,
    movieShop,
    movieYing,
    movieWode,

    {
      path: '/city',
      meta: '111',
      name: 'city',
      component: () => import('./views/City/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search/index.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/Shop/Detail.vue')
    },
    {
      path: '/myping',
      name: 'myping',
      component: () => import('./views/Ping/index.vue')
    },
    {
      path: '/yugao',
      name: 'yugao',
      component: () => import('./views/Home/Yugao.vue')
    },
    {
      path: '/loginin',
      name: 'loginin',
      component: () => import('./views/Wode/Loginin.vue')
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});

// 前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to);

  next();
});

// 后置钩子
router.afterEach((to, from) => {
  // console.log("--------");

});
export default router;
