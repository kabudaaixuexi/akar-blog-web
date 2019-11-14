const state = {
  all: {
    Data: '',
    BrandID: ''
  },
  Juzhao: {
    Img: [],
  }
}

const getters = {}

const actions = {}

const mutations = {
  setPrint(state, all) {
    console.log(state)
    state.all = all;
  },
  ///请求数据放入print
  Juzhao(state, Juzhao) {
    console.log(Juzhao);
    const ID = Juzhao.ID
    axios
      .post("http://localhost:3000/proxy", {
        url: `https://api-m.mtime.cn/Movie/ImageAll.api?movieId=${ID}`
      })
      .then(res => {
        state.Juzhao.Img = res.data.info.images
      });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
