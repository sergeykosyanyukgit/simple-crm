import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async getStatisticsChilds (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getStatisticsChilds(info)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getStatisticsSchedules (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getStatisticsSchedules(info)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getStatisticsTrials (ctx, info) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getStatisticsTrials(info)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
  },
  state: {
  },
  getters: {
  }
}
