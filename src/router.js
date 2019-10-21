import Vue from 'vue';
import Router from 'vue-router';
import movieIndex from './AllRouter/index';
import movieShop from './AllRouter/shopcart';
import movieYing from './AllRouter/movieho';
import movieWode from './AllRouter/mycon';

Vue.use(Router);

export default new Router({
  mode: 'history',
  bash: process.env.BASH_URL,
  routes: [
    movieIndex,
    movieShop,
    movieYing,
    movieWode,

    {
      path: '/city',
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
      path: '/*',
      redirect: '/',
    },
  ],
});
