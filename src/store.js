import Vue from 'vue';
import Vuex from 'vuex';
import print from './store/print';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    print
  },
  state: {
    list: [],
    ID: [],
  },
  mutations: {
    Will(state) {
      axios.post("http://localhost:3000/proxy", {
        url: 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290'
      }).then(res => {
        state.list = res;
      })
    },

    Yugao(state) {
      axios.post("http://localhost:3000/proxy", {
        url: `https://api-m.mtime.cn/Movie/Video.api?pageIndex=?&movieId=217896`
      }).then(res => {
        console.log(res);
      })
    }
  },
  actions: {

  },
});
