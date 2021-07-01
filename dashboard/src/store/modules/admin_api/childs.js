import AdminService from '../../../services/AdminService'

export default {
  actions: {
    async deleteChildschedule (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.deleteChildschedule(item)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editChildTimeTables (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editChildTimeTables(item)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async transferChild (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.transferChild(item)
          await ctx.commit('updateChilds', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editChildSchedule (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editChildSchedule(item.schedule)
          if (item.UserId !== 0) await ctx.dispatch('getAllParentInfo', item.UserId)
          resolve(data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async editChildVuex (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.editChildVuex(item)
          await ctx.dispatch('getAllParentInfo', item.UserId)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async getAllChilds (ctx) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.getAllChilds()
          console.log(data.data)
          await ctx.commit('updateChilds', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error.response.data.error)
          reject(error.response.data.error)
        }
      })
    },
    async createChild (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.createChild(item)
          await ctx.commit('updateChilds', data.data)
          resolve(data.data)
        } catch (error) {
          console.log(error)
          reject(error.response.data.error)
        }
      })
    },
    async addMoneyChild (ctx, item) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await AdminService.addMoneyChild(item)
          await ctx.dispatch('getAllParentInfo', data.data.UserId)
          resolve(data)
        } catch (error) {
          console.log(error)
          reject(error.response.data.error)
        }
      })
    }
  },
  mutations: {
    updateChilds (state, childs) {
      state.childs = childs
    },
    updateSchedule (state, schedule) {

    }
  },
  state: {
    childs: []
  },
  getters: {
    allChilds (state) {
      return state
    }
  }
}
