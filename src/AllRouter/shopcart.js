export default {
  path: '/shop',
  name: 'shop',
  redirect: {
    path: '/shop/now',
  },
  component: () => import('../views/Shop.vue'),
  children: [{
    path: 'now',
    component: () => import('../views/Shop/Nowsold.vue'),
  }, {
    path: 'will',
    component: () => import('../views/Shop/Willsold.vue'),
  }],
};
