import AdminService from '../../../services/AdminService'
import TeacherService from '../../../services/TeacherService'

export default {
  actions: {
    async getAllFilialsOnly (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await TeacherService.getAllFilialsOnly()
          ctx.commit('updateFilials', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllFilials (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllFilials()
          ctx.commit('updateFilials', data.data)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async updateFilial (ctx, filail) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.updateFilial(filail)
          await ctx.dispatch('getAllFilials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async deleteFilial (ctx, filail) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteFilial(filail)
          await ctx.dispatch('getAllFilials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createFilial (ctx, filail) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createFilial(filail)
          await ctx.dispatch('getAllFilials')
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateFilials (state, filials) {
      state.filials = filials
    }
  },
  state: {
    filials: []
  },
  getters: {
    allFilials (state) {
      return state.filials
    }
  }
}
