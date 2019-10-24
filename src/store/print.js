const state = {
  all: {
    Data: '111',
    BrandID: '111'
  }
}

const getters = {}

const actions = {}

const mutations = {
  setPrint(state, all) {
    console.log(state)
    state.all = all;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
