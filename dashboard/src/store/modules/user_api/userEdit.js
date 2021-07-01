import UserService from '../../../services/UserService'

export default {
  actions: {
    async thisUserPasswordUpdate (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserPasswordUpdate(user)
          ctx.commit('setUser', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async thisUserFullUpdate (ctx, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserFullUpdate(user)
          ctx.commit('setUser', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data)
          reject(error.response.data.message)
        }
      })
    },
    async thisChildFullUpdate (ctx, child) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisChildFullUpdate(child)
          ctx.commit('updateChild', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data)
          reject(error.response.data.message)
        }
      })
    }
  }
}
