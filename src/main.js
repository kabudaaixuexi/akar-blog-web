import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';

import 'vant/lib/index.css';


import {
  Lazyload,
  Toast
} from "vant";

Vue.use(Vant).use(Toast);
Vue.use(Lazyload);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
