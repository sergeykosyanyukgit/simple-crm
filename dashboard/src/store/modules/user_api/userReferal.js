import UserService from '../../../services/UserService'

export default {
  actions: {
    async getReferalTrils (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.getReferalTrils()
          ctx.commit('updateReferals', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createReferalTrial (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.createReferalTrial(item)
          ctx.commit('updateReferals', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateReferals (state, referals) {
      state.referals = referals
    }
  },
  state: {
    referals: []
  },
  getters: {
    allReferals (state) {
      return state
    }
  }
}
