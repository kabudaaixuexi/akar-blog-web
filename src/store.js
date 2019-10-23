import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({

  state: {

  },
  mutations: {
    Willsold() {
      axios
        .post("http://localhost:3000/proxy", {
          url: "https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290"
        })
        .then(res => {
          this.moviecomings = res.data.info.moviecomings;
          console.log(this.moviecomings);
          this.moviecomings.sort((n1, n2) => {
            if (n1.wantedCount > n2.wantedCount) {
              return -1;
            } else if (n1.wantedCount < n2.wantedCount) {
              return 1;
            } else {
              return 0;
            }
          });
        });
    }
  },
  actions: {

  },
});
