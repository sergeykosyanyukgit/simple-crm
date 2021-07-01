import UserService from '../../../services/UserService'

export default {
  actions: {
    async createMining (ctx, mining) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.createMining(mining)
          ctx.commit('miningCreated', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async thisUserReviewCreate (ctx, feedback) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserReviewCreate(feedback)
          console.log(data)
          ctx.commit('addFeedback', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async thisUserReviewDelete (ctx, feedback) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await UserService.thisUserReviewDelete(feedback)
          ctx.commit('deleteFeedback', feedback.id)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  }
}
