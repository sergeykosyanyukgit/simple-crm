export default {
  actions: {
  },
  mutations: {
    updateLoading (state, loading) {
      state.loading = loading
    }
  },
  state: {
    loading: null,
  },
  getters: {
    getLoading (state) {
      return state.loading
    }
  }
}
