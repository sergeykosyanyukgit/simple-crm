import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async createAlerts (ctx, alert) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createAlert(alert)
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
