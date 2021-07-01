import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async ReferalDiscountUpdate (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.referalDiscountUpdate(info)
          await ctx.dispatch('getAllTrials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteTrial (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteTrial(info)
          await ctx.dispatch('getAllTrials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editTrial (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editTrial(info)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createTrial (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createTrial(info)
          await ctx.dispatch('getAllTrials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllTrials (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllTrials(info)
          console.log(data)
          ctx.commit('updateTrials', data.data)
          resolve(data)
        } catch (error) {
          console.log(error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: { // Изменяем данные в store
    updateTrials (state, trials) {
      state.trials = trials
    }
  },
  state: { // Устанавливаем начальное значение
    trials: []
  },
  getters: { // Позволяют трансформировать данные и получать их из store
    allTrials (state) {
      return state.trials
    }
  }
}
