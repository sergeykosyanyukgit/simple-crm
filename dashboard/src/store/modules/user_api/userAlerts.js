import UserService from '../../../services/UserService'

export default {
  actions: {
    async thisUserAlertCheck (ctx, alert) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserAlertCheck(alert)
          ctx.commit('checkAlert', alert.id)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  }
}
