const state = {
  all: {
    Data: '',
    BrandID: ''
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
