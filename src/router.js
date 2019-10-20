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
      redirect: {
        path: '/shop/now'
      },
      component: () => import('./views/Shop.vue'),
      children: [{
        path: 'now',
        component: () => import('./views/Shop/Nowsold.vue'),
      }, {
        path: 'will',
        component: () => import('./views/Shop/Willsold.vue'),
      }]
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
    {
      path: '/city',
      name: 'city',
      component: () => import('./views/City/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search/index.vue'),
    }
  ],
});
