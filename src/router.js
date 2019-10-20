import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('./views/Shop.vue')
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('./views/Movie.vue'),
    },
    {
      path: '/wode',
      name: 'wode',
      component: () => import('./views/My.vue'),
    },
  ],
});
